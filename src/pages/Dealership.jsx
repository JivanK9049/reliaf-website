import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "../supabase";

const initialFormData = {
  dealerName: "",
  firmName: "",
  mobile: "",
  whatsapp: "",
  email: "",
  address: "",
  district: "",
  state: "",
  pincode: "",
  depositAmount: "",
  experience: "",
  message: "",
};

const Dealership = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const { error } = await supabase.from("dealership_applications").insert({
      dealer_name: formData.dealerName,
      firm_name: formData.firmName,
      mobile: formData.mobile,
      whatsapp: formData.whatsapp || null,
      email: formData.email,
      address: formData.address,
      district: formData.district,
      state: formData.state,
      pincode: formData.pincode,
      deposit_amount: formData.depositAmount ? Number(formData.depositAmount) : null,
      experience: formData.experience || null,
      message: formData.message || null,
      status: "New",
    });

    setIsSubmitting(false);

    if (error) {
      setSubmitError(
        error.code === "42P01"
          ? "The dealership application database has not been set up yet. Please contact the website administrator."
          : "We could not submit your application. Please try again later."
      );
      console.error(error);
      return;
    }

    setIsSubmitted(true);
    setFormData(initialFormData);
    window.alert("Thank you for submitting your dealership application. We will contact you soon.");
  };

  return (
<div className="bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen">

{/* HERO */}

<section className="relative overflow-hidden">

<div className="absolute inset-0">

<img
src="/hero1.png"
alt="Healthy green crops in a field"
className="w-full h-full object-cover"
/>

<div className="absolute inset-0 bg-green-900/70"></div>

</div>

<div className="relative max-w-7xl mx-auto px-6 py-24">

<motion.div

initial={{opacity:0,y:50}}
animate={{opacity:1,y:0}}
transition={{duration:0.8}}

className="text-center text-white"

>

<span className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold">

🌿 Join India's Growing Dealer Network

</span>

<h1 className="text-6xl font-extrabold mt-8 leading-tight">

Become an Authorized

<span className="text-green-300">

{" "}Reliaf Agrotech Dealer

</span>

</h1>

<p className="mt-8 text-xl max-w-3xl mx-auto text-gray-100">

Partner with Reliaf Agrotech Pvt. Ltd. and grow your agricultural business with premium bio fertilizers, crop nutrition products and world-class dealer support.

</p>

<div className="mt-12 flex justify-center gap-6 flex-wrap">

<a
href="#dealer-form"
className="bg-green-500 hover:bg-green-600 px-10 py-4 rounded-full font-bold shadow-xl transition"
>

Apply Now

</a>

<Link
to="/"
className="bg-white text-green-700 hover:bg-green-100 px-10 py-4 rounded-full font-bold shadow-xl transition"
>

Back Home

</Link>

</div>

</motion.div>

</div>

</section>

<section id="dealer-form" className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
  <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-10">
    <div className="text-center">
      <p className="font-semibold uppercase tracking-widest text-green-700">Partner with us</p>
      <h2 className="mt-3 text-3xl font-extrabold text-green-900 sm:text-4xl">Dealer Details Form</h2>
      <p className="mx-auto mt-3 max-w-2xl text-gray-600">Complete the form below and our dealership team will contact you shortly.</p>
    </div>

    {isSubmitted && (
      <div role="status" className="mt-8 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-center font-medium text-green-800">
        Thank you! Your dealership application has been received.
      </div>
    )}
    {submitError && (
      <div role="alert" className="mt-8 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-center font-medium text-red-700">
        {submitError}
      </div>
    )}

    <form onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
      <label className="grid gap-2 font-medium text-gray-700">
        Dealer name *
        <input name="dealerName" value={formData.dealerName} onChange={handleChange} required className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" />
      </label>
      <label className="grid gap-2 font-medium text-gray-700">
        Firm / business name *
        <input name="firmName" value={formData.firmName} onChange={handleChange} required className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" />
      </label>
      <label className="grid gap-2 font-medium text-gray-700">
        Mobile number *
        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" />
      </label>
      <label className="grid gap-2 font-medium text-gray-700">
        WhatsApp number
        <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" />
      </label>
      <label className="grid gap-2 font-medium text-gray-700">
        Email address *
        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" />
      </label>
      <label className="grid gap-2 font-medium text-gray-700">
        Dealer experience
        <select name="experience" value={formData.experience} onChange={handleChange} className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100">
          <option value="">Select experience</option>
          <option value="new">New dealer</option>
          <option value="1-3">1–3 years</option>
          <option value="4-7">4–7 years</option>
          <option value="8+">8+ years</option>
        </select>
      </label>
      <label className="grid gap-2 font-medium text-gray-700 sm:col-span-2">
        Business address *
        <input name="address" value={formData.address} onChange={handleChange} required className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" />
      </label>
      <label className="grid gap-2 font-medium text-gray-700">
        District *
        <input name="district" value={formData.district} onChange={handleChange} required className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" />
      </label>
      <label className="grid gap-2 font-medium text-gray-700">
        State *
        <input name="state" value={formData.state} onChange={handleChange} required className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" />
      </label>
      <label className="grid gap-2 font-medium text-gray-700">
        PIN code *
        <input inputMode="numeric" name="pincode" value={formData.pincode} onChange={handleChange} required className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" />
      </label>
      <label className="grid gap-2 font-medium text-gray-700">
        Deposit amount (₹)
        <input type="number" min="0" step="0.01" name="depositAmount" value={formData.depositAmount} onChange={handleChange} placeholder="Enter amount" className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" />
      </label>
      <label className="grid gap-2 font-medium text-gray-700 sm:col-span-2">
        Message
        <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" />
      </label>
      <button type="submit" disabled={isSubmitting} className="rounded-xl bg-green-700 px-6 py-4 font-bold text-white shadow-lg transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2">
        {isSubmitting ? "Submitting..." : "Submit Dealership Application"}
      </button>
    </form>
  </div>
</section>

    </div>

  );
};

export default Dealership;
