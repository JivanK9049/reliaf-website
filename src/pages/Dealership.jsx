import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../supabase";

const initialFormData = {
  dealerName: "",
  firmName: "",
  firmType: "",
  mobile: "",
  whatsapp: "",
  email: "",
  address: "",
  district: "",
  state: "",
  pincode: "",
  taluka: "",
  villageCity: "",
  panNumber: "",
  gstNumber: "",
  fertilizerLicense: "",
  pesticideLicense: "",
  businessType: "",
  annualTurnover: "",
  salesTarget: "",
  depositAmount: "",
  experience: "",
  message: "",
  declarationAccepted: false,
};

const inputClassName = "rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100";
const invalidInputClassName = "border-red-500 focus:border-red-500 focus:ring-red-100";
const locationDataUrl = "https://raw.githubusercontent.com/saurabhjdsingh/indian-states-districts/main/Indian%20states%20and%20districts.json";
const subdistrictDataUrl = "https://raw.githubusercontent.com/planemad/india-local-government-directory/main/administrative/3-subdistrict.csv";

const locationKey = (state, district) => `${state || ""}${district || ""}`.replace(/[^a-z0-9]/gi, "").toUpperCase();

const getContactFieldError = (name, value) => {
  if (name === "mobile" && !/^[6-9]\d{9}$/.test(value)) {
    return "Enter a valid 10-digit mobile number.";
  }

  if (name === "whatsapp" && value && !/^[6-9]\d{9}$/.test(value)) {
    return "Enter a valid 10-digit WhatsApp number.";
  }

  if (name === "email" && !/^[A-Z0-9._%+-]+@gmail\.com$/i.test(value)) {
    return "Enter a valid Gmail address (example@gmail.com).";
  }

  return "";
};

const Dealership = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [locationOptions, setLocationOptions] = useState([]);
  const [subdistrictsByLocation, setSubdistrictsByLocation] = useState({});
  const [locationsError, setLocationsError] = useState("");

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const [locationResponse, subdistrictResponse] = await Promise.all([
          fetch(locationDataUrl),
          fetch(subdistrictDataUrl),
        ]);
        if (!locationResponse.ok || !subdistrictResponse.ok) throw new Error("Could not load location data");

        const [source, subdistrictSource] = await Promise.all([
          locationResponse.text(),
          subdistrictResponse.text(),
        ]);
        const data = JSON.parse(source.replace(/,\s*([}\]])/g, "$1"));
        const subdistricts = subdistrictSource.trim().split(/\r?\n/).slice(1).reduce((locations, row) => {
          const columns = row.split(",");
          const key = locationKey(columns[2], columns[4]);
          const name = columns[7]?.trim();

          if (key && name) {
            locations[key] = locations[key] ? [...locations[key], name] : [name];
          }
          return locations;
        }, {});

        Object.keys(subdistricts).forEach((key) => {
          subdistricts[key].sort((first, second) => first.localeCompare(second));
        });

        setLocationOptions(data.states || []);
        setSubdistrictsByLocation(subdistricts);
      } catch (error) {
        console.error(error);
        setLocationsError("Location options could not be loaded. Please refresh the page and try again.");
      }
    };

    loadLocations();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "state" ? { district: "", taluka: "" } : {}),
      ...(name === "district" ? { taluka: "" } : {}),
    }));

    if (name === "mobile" || name === "whatsapp" || name === "email") {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        [name]: getContactFieldError(name, value),
      }));
    }
  };

  const selectedState = locationOptions.find((location) => location.state === formData.state);
  const districts = selectedState?.districts || [];
  const talukas = subdistrictsByLocation[locationKey(formData.state, formData.district)] || [];
  const subdistrictsLoaded = Object.keys(subdistrictsByLocation).length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const mobileError = getContactFieldError("mobile", formData.mobile);
    const whatsappError = getContactFieldError("whatsapp", formData.whatsapp);
    const emailError = getContactFieldError("email", formData.email);

    if (mobileError || whatsappError || emailError) {
      setFieldErrors({ mobile: mobileError, whatsapp: whatsappError, email: emailError });
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      dealer_name: formData.dealerName,
      firm_name: formData.firmName,
      firm_type: formData.firmType || null,
      mobile: formData.mobile,
      whatsapp: formData.whatsapp || null,
      email: formData.email,
      address: formData.address,
      district: formData.district,
      state: formData.state,
      pincode: formData.pincode,
      taluka: formData.taluka || null,
      village_city: formData.villageCity || null,
      pan_number: formData.panNumber || null,
      gst_number: formData.gstNumber || null,
      fertilizer_license: formData.fertilizerLicense || null,
      pesticide_license: formData.pesticideLicense || null,
      business_type: formData.businessType || null,
      annual_turnover: formData.annualTurnover || null,
      sales_target: formData.salesTarget ? Number(formData.salesTarget) : null,
      deposit_amount: formData.depositAmount ? Number(formData.depositAmount) : null,
      experience: formData.experience || null,
      message: formData.message || null,
      declaration_accepted: formData.declarationAccepted,
      status: "New",
    };

    let { error } = await supabase.from("dealership_applications").insert(payload);

    if (error && error.code === "PGRST204" && /taluka|village_city/i.test(error.message || "")) {
      const fallbackPayload = { ...payload };
      delete fallbackPayload.taluka;
      delete fallbackPayload.village_city;
      const retry = await supabase.from("dealership_applications").insert(fallbackPayload);
      error = retry.error;
    }

    setIsSubmitting(false);

    if (error) {
      setSubmitError(
        error.code === "42P01" || error.code === "42703"
          ? "The dealership application database has not been set up yet. Please contact the website administrator."
          : "We could not submit your application. Please try again later."
      );
      console.error(error);
      return;
    }

    setIsSubmitted(true);
    setFormData(initialFormData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src="/hero1.png" alt="Healthy green crops in a field" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-green-950/75" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center text-white">
            <Link to="/" className="mx-auto mb-7 flex w-fit items-center justify-center rounded-2xl bg-white p-2 shadow-xl" aria-label="Reliaf Agrotech home">
              <img src="/logo.png" alt="Reliaf Agrotech Pvt. Ltd." className="h-16 w-16 object-contain sm:h-20 sm:w-20" />
            </Link>
            <span className="rounded-full bg-yellow-400 px-5 py-2 font-semibold text-green-950">Join India's growing dealer network</span>
            <h1 className="mt-8 text-4xl font-extrabold leading-tight sm:text-6xl">
              Become an Authorized <span className="text-green-300">Reliaf Agrotech Dealer</span>
            </h1>
            <p className="mx-auto mt-8 max-w-3xl text-lg text-gray-100 sm:text-xl">
              Partner with Reliaf Agrotech Pvt. Ltd. to bring dependable crop nutrition and bio-fertilizer solutions to farmers in your region.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#dealer-form" className="rounded-full bg-green-500 px-10 py-4 font-bold shadow-xl transition hover:bg-green-600">Apply now</a>
              <Link to="/" className="rounded-full bg-white px-10 py-4 font-bold text-green-700 shadow-xl transition hover:bg-green-100">Back home</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="dealer-form" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-10">
          <div className="text-center">
            <p className="font-semibold uppercase tracking-widest text-green-700">Reliaf Agrotech Pvt. Ltd.</p>
            <h2 className="mt-3 text-3xl font-extrabold text-green-900 sm:text-4xl">Dealership Appointment Form</h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">Share your business details and our dealership team will review your application and contact you.</p>
          </div>

          {isSubmitted && <div role="status" className="mt-8 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-center font-medium text-green-800">Thank you! Your dealership application has been received.</div>}
          {submitError && <div role="alert" className="mt-8 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-center font-medium text-red-700">{submitError}</div>}

          <form onSubmit={handleSubmit} className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-xl font-bold text-green-900">Business and contact details</legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 font-medium text-gray-700">Firm / business name *<input name="firmName" value={formData.firmName} onChange={handleChange} required className={inputClassName} /></label>
                <label className="grid gap-2 font-medium text-gray-700">Type of firm *<select name="firmType" value={formData.firmType} onChange={handleChange} required className={inputClassName}><option value="">Select type</option><option value="Sole proprietor">Sole proprietor</option><option value="Partnership">Partnership</option><option value="Private limited">Private limited</option><option value="Public limited">Public limited</option><option value="Other">Other</option></select></label>
                <label className="grid gap-2 font-medium text-gray-700">Responsible person / proprietor *<input name="dealerName" value={formData.dealerName} onChange={handleChange} required className={inputClassName} /></label>
                <label className="grid gap-2 font-medium text-gray-700">Mobile number *<input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} inputMode="numeric" maxLength="10" pattern="[6-9][0-9]{9}" aria-invalid={Boolean(fieldErrors.mobile)} aria-describedby={fieldErrors.mobile ? "mobile-error" : undefined} required className={`${inputClassName} ${fieldErrors.mobile ? invalidInputClassName : ""}`} />{fieldErrors.mobile && <span id="mobile-error" className="text-sm font-medium text-red-600">{fieldErrors.mobile}</span>}</label>
                <label className="grid gap-2 font-medium text-gray-700">WhatsApp number<input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} inputMode="numeric" maxLength="10" pattern="[6-9][0-9]{9}" aria-invalid={Boolean(fieldErrors.whatsapp)} aria-describedby={fieldErrors.whatsapp ? "whatsapp-error" : undefined} className={`${inputClassName} ${fieldErrors.whatsapp ? invalidInputClassName : ""}`} />{fieldErrors.whatsapp && <span id="whatsapp-error" className="text-sm font-medium text-red-600">{fieldErrors.whatsapp}</span>}</label>
                <label className="grid gap-2 font-medium text-gray-700">Gmail address *<input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@gmail.com" pattern="[A-Za-z0-9._%+-]+@gmail\\.com" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "email-error" : undefined} required className={`${inputClassName} ${fieldErrors.email ? invalidInputClassName : ""}`} />{fieldErrors.email && <span id="email-error" className="text-sm font-medium text-red-600">{fieldErrors.email}</span>}</label>
                <label className="grid gap-2 font-medium text-gray-700 sm:col-span-2">Office / business address (shop / street) *<input name="address" value={formData.address} onChange={handleChange} required className={inputClassName} /></label>
                <label className="grid gap-2 font-medium text-gray-700">State / union territory *<select name="state" value={formData.state} onChange={handleChange} required disabled={!locationOptions.length} className={inputClassName}><option value="">{locationOptions.length ? "Select state / union territory" : "Loading locations..."}</option>{locationOptions.map((location) => <option key={location.state} value={location.state}>{location.state}</option>)}</select></label>
                <label className="grid gap-2 font-medium text-gray-700">District *<select name="district" value={formData.district} onChange={handleChange} required disabled={!formData.state || !districts.length} className={inputClassName}><option value="">{formData.state ? "Select district" : "Select state first"}</option>{districts.map((district) => <option key={district} value={district}>{district}</option>)}</select></label>
                <label className="grid gap-2 font-medium text-gray-700">Taluka / tehsil *<select name="taluka" value={formData.taluka} onChange={handleChange} required disabled={!formData.district || !subdistrictsLoaded} className={inputClassName}><option value="">{formData.district ? (talukas.length ? "Select taluka / tehsil" : subdistrictsLoaded ? "No taluka / tehsil found" : "Loading taluka / tehsil...") : "Select district first"}</option>{talukas.map((taluka) => <option key={taluka} value={taluka}>{taluka}</option>)}</select></label>
                <label className="grid gap-2 font-medium text-gray-700">Village / city *<input name="villageCity" value={formData.villageCity} onChange={handleChange} required className={inputClassName} /></label>
                <label className="grid gap-2 font-medium text-gray-700">PIN code *<input inputMode="numeric" name="pincode" value={formData.pincode} onChange={handleChange} required className={inputClassName} /></label>
                {locationsError && <p role="alert" className="sm:col-span-2 text-sm font-medium text-red-600">{locationsError}</p>}
              </div>
            </fieldset>

            <fieldset className="border-t border-green-100 pt-8">
              <legend className="text-xl font-bold text-green-900">Registration and business profile</legend>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 font-medium text-gray-700">GST number<input name="gstNumber" value={formData.gstNumber} onChange={handleChange} className={inputClassName} /></label>
                <label className="grid gap-2 font-medium text-gray-700">PAN number<input name="panNumber" value={formData.panNumber} onChange={handleChange} className={inputClassName} /></label>
                <label className="grid gap-2 font-medium text-gray-700">Fertilizer licence number<input name="fertilizerLicense" value={formData.fertilizerLicense} onChange={handleChange} className={inputClassName} /></label>
                <label className="grid gap-2 font-medium text-gray-700">Pesticide licence number<input name="pesticideLicense" value={formData.pesticideLicense} onChange={handleChange} className={inputClassName} /></label>
                <label className="grid gap-2 font-medium text-gray-700">Nature of business<select name="businessType" value={formData.businessType} onChange={handleChange} className={inputClassName}><option value="">Select business type</option><option value="Retailer">Retailer</option><option value="Wholesaler">Wholesaler</option><option value="Distributor">Distributor</option><option value="Commission agency">Commission agency</option><option value="Other">Other</option></select></label>
                <label className="grid gap-2 font-medium text-gray-700">Dealership experience<select name="experience" value={formData.experience} onChange={handleChange} className={inputClassName}><option value="">Select experience</option><option value="New dealer">New dealer</option><option value="1-3 years">1-3 years</option><option value="4-7 years">4-7 years</option><option value="8+ years">8+ years</option></select></label>
                <label className="grid gap-2 font-medium text-gray-700">Previous annual turnover (INR)<input type="number" min="0" step="0.01" name="annualTurnover" value={formData.annualTurnover} onChange={handleChange} className={inputClassName} /></label>
                <label className="grid gap-2 font-medium text-gray-700">Expected annual sales target (INR)<input type="number" min="0" step="0.01" name="salesTarget" value={formData.salesTarget} onChange={handleChange} className={inputClassName} /></label>
                <label className="grid gap-2 font-medium text-gray-700 sm:col-span-2">Expected security deposit (INR)<input type="number" min="0" step="0.01" name="depositAmount" value={formData.depositAmount} onChange={handleChange} placeholder="Optional - do not make a payment at this stage" className={inputClassName} /></label>
              </div>
            </fieldset>

            <fieldset className="border-t border-green-100 pt-8">
              <legend className="text-xl font-bold text-green-900">Additional information</legend>
              <label className="mt-5 grid gap-2 font-medium text-gray-700">Tell us about your current product range, market coverage, or any questions<textarea name="message" value={formData.message} onChange={handleChange} rows="4" className={inputClassName} /></label>
              <p className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-900">After preliminary review, our team may request supporting documents such as business registration, relevant licences, GST certificate, and identity/address proof.</p>
              <label className="mt-5 flex items-start gap-3 text-sm font-medium text-gray-700"><input type="checkbox" name="declarationAccepted" checked={formData.declarationAccepted} onChange={handleChange} required className="mt-1 h-4 w-4 accent-green-700" /><span>I confirm that the information I have provided is accurate and I agree to be contacted by Reliaf Agrotech Pvt. Ltd. regarding this dealership application.</span></label>
            </fieldset>

            <button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-green-700 px-6 py-4 font-bold text-white shadow-lg transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? "Submitting..." : "Submit dealership application"}</button>
          </form>
        </div>
      </section>

      <footer className="bg-gray-950 px-6 py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-white p-2">
              <img src="/logo.png" alt="Reliaf Agrotech Pvt. Ltd." className="h-14 w-14 object-contain" />
            </div>
            <div>
              <p className="text-lg font-bold">Reliaf Agrotech Pvt. Ltd.</p>
              <p className="mt-1 text-sm text-gray-300">Growing agriculture, together.</p>
            </div>
          </div>

          <div className="text-sm text-gray-300">
            <p>GSTIN: 27AAOCR6086N1ZE</p>
            <p className="mt-1">Bio-Fertilizer License: LCFWD2025120498</p>
            <p className="mt-1">Bio-Stimulant License: LCBWD1220250148</p>
          </div>

          <div className="flex flex-col gap-2 text-sm font-medium">
            <Link to="/" className="transition hover:text-green-300">Home</Link>
            <a href="#dealer-form" className="transition hover:text-green-300">Dealership application</a>
            <a href="/privacy-policy" className="transition hover:text-green-300">Privacy policy</a>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-6xl border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Reliaf Agrotech Pvt. Ltd. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dealership;
