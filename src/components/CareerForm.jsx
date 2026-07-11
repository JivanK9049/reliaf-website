const fields = [["full_name", "Full Name", "text", true], ["mobile", "Mobile Number", "tel", true], ["email", "Email Address", "email", true], ["qualification", "Highest Qualification", "text", true], ["current_location", "Current Location", "text"], ["experience", "Experience", "text", true], ["current_company", "Current Company", "text"], ["expected_salary", "Expected Salary", "text", true], ["preferred_location", "Preferred Location", "text"]];

const validateContactDetails = (event) => {
  const formData = new FormData(event.currentTarget);
  const mobile = String(formData.get("mobile") || "").replace(/\D/g, "");
  const email = String(formData.get("email") || "").trim();

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    event.preventDefault();
    alert("Please enter a correct 10-digit Indian mobile number.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    event.preventDefault();
    alert("Please enter a correct email address.");
    return;
  }

  if (!event.currentTarget.checkValidity()) {
    event.preventDefault();
    alert("Please complete all required fields before submitting your application.");
  }
};
export default function CareerForm() { return <section id="apply" className="bg-[#dcfce7]/60 px-6 py-24"><div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-6 shadow-xl shadow-green-900/10 md:p-10" data-aos="fade-up"><div className="max-w-2xl"><p className="font-bold tracking-widest text-[#15803d]">APPLY TODAY</p><h2 className="mt-3 text-4xl font-black text-slate-800">Take the next step.</h2><p className="mt-3 text-slate-600">Tell us about yourself and our HR team will be in touch.</p></div><form action="https://formsubmit.co/reliafagrotech@gmail.com" method="POST" encType="multipart/form-data" noValidate onSubmit={validateContactDetails} className="mt-9 grid gap-5 md:grid-cols-2"><input type="hidden" name="_subject" value="New Career Application - Reliaf Agrotech" /><input type="hidden" name="_captcha" value="false" />{fields.map(([name, label, type, required]) => <label key={name} className="text-sm font-semibold text-slate-700">{label}{required && <span className="ml-1 text-red-500">*</span>}<input required={required} name={name} type={type} maxLength={name === "mobile" ? 10 : undefined} inputMode={name === "mobile" ? "numeric" : undefined} onInput={name === "mobile" ? (event) => { event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 10); } : undefined} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none transition focus:border-[#15803d] focus:ring-4 focus:ring-green-100" /></label>)}<label className="text-sm font-semibold text-slate-700">Position<span className="ml-1 text-red-500">*</span><select name="position" required className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal outline-none focus:border-[#15803d]"><option value="">Select a position</option><option>Sales Officer</option><option>Marketing Executive</option><option>Area Sales Manager</option><option>Agriculture Officer</option><option>Agronomist</option><option>Field Officer</option><option>Farm Advisor</option><option>Crop Specialist</option><option>Soil Testing Technician</option><option>Production Executive</option><option>Quality Control Executive</option><option>Other</option></select></label><label className="text-sm font-semibold text-slate-700">Resume Upload<span className="ml-1 text-red-500">*</span><input name="resume" type="file" accept=".pdf,.doc,.docx" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal" /></label><label className="text-sm font-semibold text-slate-700 md:col-span-2">Cover Letter<textarea name="cover_letter" rows="5" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 font-normal outline-none focus:border-[#15803d]" placeholder="Tell us why you would be a great fit." /></label><button type="submit" className="rounded-xl bg-[#15803d] px-7 py-4 font-bold text-white transition hover:bg-[#14532d] md:col-span-2">Submit Application</button></form></div></section>; }
