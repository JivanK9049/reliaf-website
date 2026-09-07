import { useMemo, useState } from "react";
import {
  FiActivity,
  FiCamera,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiDollarSign,
  FiFileText,
  FiHome,
  FiMapPin,
  FiMenu,
  FiNavigation,
  FiPackage,
  FiPhone,
  FiPower,
  FiRefreshCw,
  FiUsers,
  FiWifiOff,
  FiX,
} from "react-icons/fi";

const employees = [
  { name: "Amit Patil", area: "Solapur North", initials: "AP", color: "bg-emerald-600", status: "In field", time: "09:12 AM", visits: 5 },
  { name: "Priya Jadhav", area: "Madha", initials: "PJ", color: "bg-violet-600", status: "In field", time: "09:04 AM", visits: 4 },
  { name: "Rohit Shinde", area: "Barshi", initials: "RS", color: "bg-orange-500", status: "Travelling", time: "09:25 AM", visits: 3 },
  { name: "Sneha Kulkarni", area: "Akkalkot", initials: "SK", color: "bg-sky-600", status: "Offline", time: "08:58 AM", visits: 2 },
];

const actions = [
  { icon: FiMapPin, title: "Visit check-in", text: "Record visit location", tone: "bg-emerald-50 text-emerald-700" },
  { icon: FiCamera, title: "Add visit photo", text: "Capture proof of visit", tone: "bg-amber-50 text-amber-700" },
  { icon: FiFileText, title: "Daily report", text: "Share today's update", tone: "bg-blue-50 text-blue-700" },
  { icon: FiDollarSign, title: "Order / payment", text: "Add order or collection", tone: "bg-violet-50 text-violet-700" },
];

export default function EmployeeTracking({ mode }) {
  const [view, setView] = useState("employee");
  const [dayStarted, setDayStarted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const today = useMemo(() => new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long" }).format(new Date()), []);

  const notify = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  };

  if (mode === "employee") {
    return <EmployeeWorkspace dayStarted={dayStarted} setDayStarted={setDayStarted} notice={notice} notify={notify} />;
  }

  if (mode === "admin") {
    return <AdminWorkspace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Reliaf Agrotech" className="h-11 w-11 rounded-xl object-cover" />
            <div>
              <p className="text-lg font-extrabold leading-tight text-emerald-800">Reliaf Track</p>
              <p className="text-xs font-medium text-slate-500">Field Force Management</p>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
            <a href="#overview" className="text-emerald-700">Overview</a>
            <a href="#features" className="hover:text-emerald-700">Features</a>
            <a href="#admin" className="hover:text-emerald-700">Admin portal</a>
          </nav>
          <button onClick={() => setShowMenu(!showMenu)} className="rounded-lg p-2 text-2xl text-emerald-800 md:hidden" aria-label="Open navigation">
            {showMenu ? <FiX /> : <FiMenu />}
          </button>
        </div>
        {showMenu && <div className="border-t border-slate-100 bg-white px-5 py-3 md:hidden"><a className="block py-2" href="#overview">Overview</a><a className="block py-2" href="#features">Features</a><a className="block py-2" href="#admin">Admin portal</a></div>}
      </header>

      <main id="overview">
        <section className="bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 px-4 py-14 text-white sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_.95fr]">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold"><FiActivity /> Built for your field team</div>
              <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl">Every field visit. Clearly tracked.</h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-emerald-50">A single system for your employees to mark attendance, log dealer and farmer visits, add orders, and keep the office informed in real time.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => setView("employee")} className={`rounded-xl px-5 py-3 font-bold transition ${view === "employee" ? "bg-white text-emerald-800" : "border border-white/40 bg-white/10 hover:bg-white/20"}`}>Employee app</button>
                <button onClick={() => setView("admin")} className={`rounded-xl px-5 py-3 font-bold transition ${view === "admin" ? "bg-white text-emerald-800" : "border border-white/40 bg-white/10 hover:bg-white/20"}`}>Admin dashboard</button>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-emerald-100"><span>✓ GPS enabled</span><span>✓ Offline-ready</span><span>✓ Designed for 10+ employees</span></div>
            </div>
            <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/20 bg-white p-3 text-slate-800 shadow-2xl">
              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-slate-400">Today’s field plan</p><p className="mt-1 font-extrabold">{today}</p></div><div className="rounded-xl bg-emerald-100 p-3 text-emerald-700"><FiNavigation /></div></div>
                <div className="mt-5 rounded-2xl bg-emerald-700 p-4 text-white"><p className="text-sm text-emerald-100">Next destination</p><p className="mt-1 text-lg font-bold">Shivkrupa Agro Center</p><p className="mt-1 text-sm text-emerald-100">2.4 km away · Madha Road</p></div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center"><Metric value="05" label="Visits" /><Metric value="₹32k" label="Orders" /><Metric value="18.6" label="Km" /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="mx-auto mb-7 flex max-w-3xl rounded-xl bg-slate-200 p-1">
            <button onClick={() => setView("employee")} className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold ${view === "employee" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500"}`}>Employee App</button>
            <button onClick={() => setView("admin")} className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-bold ${view === "admin" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500"}`}>Admin Dashboard</button>
          </div>
          {view === "employee" ? <EmployeePanel dayStarted={dayStarted} setDayStarted={setDayStarted} notify={notify} /> : <AdminPanel />}
        </section>

        <section id="features" className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-7xl"><div className="max-w-2xl"><p className="font-bold uppercase tracking-[.18em] text-emerald-700">Complete field workflow</p><h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Everything your team needs in one app</h2></div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{actions.map(({ icon: Icon, title, text, tone }) => <div key={title} className="rounded-2xl border border-slate-100 p-5 shadow-sm"><div className={`mb-4 inline-flex rounded-xl p-3 text-xl ${tone}`}><Icon /></div><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>)}</div>
          </div>
        </section>

        <section id="admin" className="mx-auto max-w-7xl px-4 py-16 sm:px-6"><div className="rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10"><div className="grid gap-10 lg:grid-cols-2"><div><p className="font-bold uppercase tracking-[.18em] text-emerald-400">For the office</p><h2 className="mt-3 text-3xl font-black">Know what is happening on the ground.</h2><p className="mt-4 leading-7 text-slate-300">Monitor active employees, routes, attendance, collections, orders and day-end reports from one clear dashboard.</p></div><div className="grid grid-cols-2 gap-3 text-sm">{["Live map & routes", "Attendance records", "Dealer/farmer visits", "Orders & collections", "Expenses", "Performance reports"].map((feature) => <div className="flex items-center gap-2 rounded-xl bg-white/10 p-3" key={feature}><FiCheckCircle className="shrink-0 text-emerald-400" />{feature}</div>)}</div></div></div></section>
      </main>
      {notice && <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl">{notice}</div>}
    </div>
  );
}

function TrackingHeader({ title, subtitle, admin = false }) {
  return <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6"><a href="/" className="flex items-center gap-3"><img src="/logo.png" alt="Reliaf Agrotech" className="h-10 w-10 rounded-xl object-cover" /><div><p className="font-extrabold text-emerald-800">Reliaf Track</p><p className="text-xs text-slate-500">{subtitle}</p></div></a><div className="hidden text-right sm:block"><p className="text-sm font-bold text-slate-800">{title}</p><a href={admin ? "/employee-tracking/employee" : "/employee-tracking/admin"} className="text-xs font-semibold text-emerald-700 hover:underline">Open {admin ? "employee app" : "admin dashboard"}</a></div></div></header>;
}

function EmployeeWorkspace({ dayStarted, setDayStarted, notice, notify }) {
  return <div className="min-h-screen bg-slate-50 text-slate-800"><TrackingHeader title="Amit Patil" subtitle="Employee app" /><main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10"><div className="mb-7 flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Field employee</p><h1 className="mt-1 text-3xl font-black">My workday</h1></div><span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">● GPS {dayStarted ? "active" : "ready"}</span></div><EmployeePanel dayStarted={dayStarted} setDayStarted={setDayStarted} notify={notify} /></main><nav className="sticky bottom-0 grid grid-cols-4 border-t border-slate-200 bg-white text-center text-xs font-bold text-slate-500"><a className="p-3 text-emerald-700" href="#top"><FiHome className="mx-auto mb-1 text-lg" />Home</a><button onClick={() => notify("Route tracking opened.")} className="p-3"><FiNavigation className="mx-auto mb-1 text-lg" />Route</button><button onClick={() => notify("Visit list opened.")} className="p-3"><FiUsers className="mx-auto mb-1 text-lg" />Visits</button><button onClick={() => notify("Profile opened.")} className="p-3"><FiPhone className="mx-auto mb-1 text-lg" />Profile</button></nav>{notice && <div className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl">{notice}</div>}</div>;
}

function AdminWorkspace() {
  return <div className="min-h-screen bg-slate-50 text-slate-800"><TrackingHeader title="Admin control center" subtitle="Administrator dashboard" admin /><main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10"><div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-emerald-700">Operations overview</p><h1 className="mt-1 text-3xl font-black">Field team dashboard</h1><p className="mt-2 text-sm text-slate-500">Monitor attendance, live field movement, visits and sales activity.</p></div><div className="flex gap-2"><button className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold"><FiFileText className="mr-2 inline" />Reports</button><button className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white"><FiUsers className="mr-2 inline" />Employees</button></div></div><AdminPanel /></main></div>;
}

function Metric({ value, label }) { return <div className="rounded-xl bg-white p-3 shadow-sm"><p className="font-extrabold text-slate-800">{value}</p><p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p></div>; }

function EmployeePanel({ dayStarted, setDayStarted, notify }) {
  return <div className="grid gap-6 lg:grid-cols-[1.45fr_.8fr]"><div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-bold text-emerald-700">GOOD MORNING, AMIT</p><h2 className="mt-1 text-2xl font-black">Your field day</h2><p className="mt-1 text-sm text-slate-500">Live location is {dayStarted ? "being shared" : "ready to start"}</p></div><button onClick={() => { setDayStarted(!dayStarted); notify(dayStarted ? "Day ended successfully." : "Day started — GPS tracking is active."); }} className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white ${dayStarted ? "bg-slate-700" : "bg-emerald-600 hover:bg-emerald-700"}`}><FiPower /> {dayStarted ? "End day" : "Start day"}</button></div>
    <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5"><div className="flex gap-3"><div className="rounded-xl bg-emerald-600 p-3 text-white"><FiMapPin /></div><div><p className="font-bold">Current location</p><p className="mt-1 text-sm text-slate-600">Near Madha Bus Stand, Solapur</p><p className="mt-2 text-xs font-semibold text-emerald-700">● GPS accuracy: 12 metres</p></div></div></div>
    <div className="mt-6 grid gap-3 sm:grid-cols-2">{actions.map(({ icon: Icon, title, text, tone }) => <button onClick={() => notify(`${title} opened.`)} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-emerald-300 hover:shadow-sm" key={title}><span className={`rounded-xl p-3 ${tone}`}><Icon /></span><span><span className="block font-bold">{title}</span><span className="mt-1 block text-xs text-slate-500">{text}</span></span><FiChevronRight className="ml-auto text-slate-400" /></button>)}</div>
  </div><aside className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><h3 className="font-black">Today’s progress</h3><div className="mt-6 space-y-5"><Progress label="Attendance marked" value="9:12 AM" complete /><Progress label="Dealer & farmer visits" value="5 / 8 visits" percent={62} /><Progress label="Distance covered" value="18.6 / 30 km" percent={62} /></div><div className="mt-7 rounded-2xl bg-slate-50 p-4"><div className="flex items-center gap-2 font-bold"><FiWifiOff className="text-amber-600" /> Offline support</div><p className="mt-2 text-sm leading-6 text-slate-500">Your work is safely stored and automatically synced when your network returns.</p></div></aside></div>;
}

function Progress({ label, value, percent, complete }) { return <div><div className="flex justify-between gap-3 text-sm"><span className="font-semibold">{label}</span><span className="font-bold text-emerald-700">{complete ? <FiCheckCircle className="inline" /> : value}</span></div>{!complete && <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${percent}%` }} /></div>}</div>; }

function AdminPanel() { return <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sm:p-7"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-sm font-bold text-emerald-700">ADMIN DASHBOARD</p><h2 className="mt-1 text-2xl font-black">Today’s field activity</h2></div><button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600"><FiRefreshCw /> Refresh</button></div><div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric value="10" label="Employees" /><Metric value="8" label="Active now" /><Metric value="37" label="Visits today" /><Metric value="₹1.24L" label="Orders today" /></div><div className="mt-7 grid gap-6 lg:grid-cols-[1.2fr_.8fr]"><div className="overflow-hidden rounded-2xl border border-slate-200"><div className="flex items-center justify-between border-b border-slate-200 px-5 py-4"><h3 className="font-black">Live employee map</h3><span className="text-xs font-bold text-emerald-700">8 LIVE</span></div><div className="relative h-64 overflow-hidden bg-emerald-50"><div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(#bbf7d0 1px, transparent 1px), linear-gradient(90deg, #bbf7d0 1px, transparent 1px)", backgroundSize: "36px 36px" }} />{[["top-12 left-[22%]", "AP"], ["top-28 left-[56%]", "PJ"], ["top-16 right-[14%]", "RS"], ["bottom-10 left-[40%]", "NV"]].map(([position, initials]) => <div key={initials} className={`absolute ${position} flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-xs font-bold text-white shadow-lg`}>{initials}</div>)}<div className="absolute bottom-4 left-4 rounded-lg bg-white px-3 py-2 text-xs font-bold shadow">Solapur region</div></div></div><div><h3 className="mb-3 font-black">Team status</h3><div className="space-y-3">{employees.map((employee) => <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3" key={employee.name}><div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white ${employee.color}`}>{employee.initials}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{employee.name}</p><p className="text-xs text-slate-500">{employee.area} · {employee.visits} visits</p></div><span className={`text-xs font-bold ${employee.status === "Offline" ? "text-slate-400" : "text-emerald-700"}`}>{employee.status}</span></div>)}</div></div></div></div>; }
