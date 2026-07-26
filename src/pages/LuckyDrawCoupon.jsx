import { useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTicketAlt } from "react-icons/fa";
import { supabase } from "../supabase";

const initialForm = { dealerName: "", shopName: "", mobile: "", address: "", couponAmount: "" };

export default function LuckyDrawCoupon() {
  const [formData, setFormData] = useState(initialForm);
  const [couponDetails, setCouponDetails] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submitCoupon = async (event) => {
    event.preventDefault();
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    setSubmitting(true);
    setError("");
    const { data, error: requestError } = await supabase.rpc("create_lucky_draw_coupon", {
      p_dealer_name: formData.dealerName.trim(),
      p_shop_name: formData.shopName.trim(),
      p_address: formData.address.trim(),
      p_mobile: formData.mobile,
      p_coupon_amount: Number(formData.couponAmount),
    });
    setSubmitting(false);

    if (requestError) {
      console.error(requestError);
      setError("We could not generate your coupon. Please try again.");
      return;
    }
    setCouponDetails({
      couponNumber: Array.isArray(data) ? data[0]?.coupon_number : data,
      shopName: formData.shopName.trim(),
      couponAmount: Number(formData.couponAmount),
    });
    setFormData(initialForm);
  };

  if (couponDetails) {
    return <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-950 via-green-800 to-emerald-600 px-6 py-14"><section className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-2xl sm:p-12"><img src="/logo.png" alt="Reliaf Agrotech" className="mx-auto h-20 w-20 rounded-2xl bg-white p-2 object-contain shadow-sm" /><FaCheckCircle className="mx-auto mt-6 text-6xl text-green-600" /><p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-green-700">Coupon generated</p><h1 className="mt-3 text-3xl font-extrabold text-slate-900">You are entered in the lucky draw!</h1><p className="mt-3 text-lg font-bold text-slate-700">{couponDetails.shopName}</p><div className="mt-7 rounded-2xl border-2 border-dashed border-green-300 bg-green-50 px-5 py-6"><p className="text-sm font-semibold text-slate-600">Your coupon number</p><p className="mt-2 text-3xl font-black tracking-wider text-green-800 sm:text-4xl">{couponDetails.couponNumber}</p><p className="mt-3 text-base font-bold text-slate-700">Coupon amount: ₹{couponDetails.couponAmount.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p></div><p className="mt-6 text-sm leading-6 text-slate-600">Please keep this coupon number safe. The Reliaf team will contact you using the mobile number you provided.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={() => setCouponDetails(null)} className="rounded-xl bg-green-700 px-5 py-3 font-bold text-white transition hover:bg-green-800">Generate another</button><Link to="/admin/reliaf-dashboard" className="rounded-xl border border-slate-200 px-5 py-3 font-bold text-slate-700 transition hover:bg-slate-50">Back to dashboard</Link></div></section></main>;
  }

  return <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 px-6 py-12 sm:py-20"><section className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"><div className="bg-gradient-to-r from-green-950 to-green-700 px-7 py-10 text-center text-white sm:px-12"><img src="/logo.png" alt="Reliaf Agrotech" className="mx-auto h-20 w-20 rounded-2xl bg-white p-2 object-contain" /><div className="mt-6 flex items-center justify-center gap-2 text-amber-300"><FaTicketAlt /><span className="font-bold uppercase tracking-[0.2em] text-sm">Reliaf Agrotech</span></div><h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">Lucky Draw Coupon</h1></div><form onSubmit={submitCoupon} className="space-y-6 p-7 sm:p-12"><label className="grid gap-2 font-semibold text-slate-700">Dealer name<input required value={formData.dealerName} onChange={(event) => setFormData({ ...formData, dealerName: event.target.value })} className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" /></label><label className="grid gap-2 font-semibold text-slate-700">Shop name<input required value={formData.shopName} onChange={(event) => setFormData({ ...formData, shopName: event.target.value })} className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" /></label><label className="grid gap-2 font-semibold text-slate-700">Mobile number<input required type="tel" inputMode="numeric" maxLength="10" pattern="[6-9][0-9]{9}" value={formData.mobile} onChange={(event) => setFormData({ ...formData, mobile: event.target.value.replace(/\D/g, "") })} className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" /></label><label className="grid gap-2 font-semibold text-slate-700">Address<textarea required rows="3" value={formData.address} onChange={(event) => setFormData({ ...formData, address: event.target.value })} className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" /></label><label className="grid gap-2 font-semibold text-slate-700">Coupon amount (INR)<input required type="number" min="0" step="0.01" value={formData.couponAmount} onChange={(event) => setFormData({ ...formData, couponAmount: event.target.value })} className="rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100" /></label>{error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 font-medium text-red-700">{error}</p>}<button disabled={submitting} type="submit" className="w-full rounded-xl bg-green-700 px-6 py-4 font-bold text-white shadow-lg transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70">{submitting ? "Generating coupon..." : "Generate coupon number"}</button><Link to="/admin/reliaf-dashboard" className="block text-center text-sm font-semibold text-green-700 hover:underline">Back to admin dashboard</Link></form></section></main>;
}
