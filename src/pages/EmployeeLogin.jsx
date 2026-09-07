import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export default function EmployeeLogin({ admin = false }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault(); setLoading(true); setError("");
    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) { setError(loginError.message); setLoading(false); return; }
    const { data: profile, error: profileError } = await supabase.from("employee_profiles").select("role").eq("id", data.user.id).single();
    if (profileError || !profile || (admin ? profile.role !== "admin" : profile.role !== "employee")) {
      await supabase.auth.signOut(); setError(admin ? "This account does not have administrator access." : "Please use an employee account to sign in."); setLoading(false); return;
    }
    navigate(admin ? "/employee-tracking/admin" : "/employee-tracking/employee", { replace: true });
  }
  return <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-950 to-emerald-700 px-4 py-10"><section className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl sm:p-9"><a href="/" className="flex items-center justify-center gap-3"><img src="/logo.png" alt="Reliaf" className="h-12 w-12 rounded-xl object-cover" /><span className="text-xl font-black text-emerald-800">Reliaf Track</span></a><div className="mt-8 text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-700">{admin ? "Office portal" : "Field force portal"}</p><h1 className="mt-2 text-3xl font-black">{admin ? "Admin login" : "Employee login"}</h1><p className="mt-3 text-sm leading-6 text-slate-500">Sign in to securely access your {admin ? "team dashboard" : "daily field activities"}.</p></div><form className="mt-7 space-y-4" onSubmit={submit}><label className="block text-sm font-bold">Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" placeholder="name@company.com" /></label><label className="block text-sm font-bold">Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500" placeholder="Your password" /></label>{error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}<button disabled={loading} className="w-full rounded-xl bg-emerald-700 py-3.5 font-bold text-white transition hover:bg-emerald-800 disabled:opacity-60">{loading ? "Signing in…" : "Sign in securely"}</button></form><p className="mt-6 text-center text-sm text-slate-500">{admin ? "Employee?" : "Administrator?"} <a className="font-bold text-emerald-700" href={admin ? "/employee-tracking/login" : "/employee-tracking/admin-login"}>{admin ? "Employee login" : "Admin login"}</a></p></section></main>;
}
