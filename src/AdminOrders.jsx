import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaChartLine,
  FaCheckCircle,
  FaClipboardList,
  FaClock,
  FaEdit,
  FaEnvelope,
  FaFileAlt,
  FaSyncAlt,
  FaStore,
  FaSignOutAlt,
  FaTruck,
  FaTrash,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";
import { supabase } from "./supabase";

const orderStatuses = ["Pending", "Confirmed", "Dispatched", "Delivered"];
const applicationStatuses = ["New", "Contacted", "Under Review", "Approved", "Rejected"];

const statusClass = (status) => ({
  Pending: "bg-amber-50 text-amber-800 ring-amber-200",
  Confirmed: "bg-blue-50 text-blue-800 ring-blue-200",
  Dispatched: "bg-violet-50 text-violet-800 ring-violet-200",
  Delivered: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  New: "bg-amber-50 text-amber-800 ring-amber-200",
  Contacted: "bg-blue-50 text-blue-800 ring-blue-200",
  "Under Review": "bg-violet-50 text-violet-800 ring-violet-200",
  Approved: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  Rejected: "bg-red-50 text-red-800 ring-red-200",
}[status] || "bg-gray-50 text-gray-700 ring-gray-200");

function MetricCard({ label, value, detail, icon: Icon, tone }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
          {detail && <p className="mt-1 text-xs text-slate-500">{detail}</p>}
        </div>
        <div className={`rounded-xl p-3 ${tone}`}><Icon className="text-lg" /></div>
      </div>
    </div>
  );
}

export default function AdminOrders() {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [savingEdit, setSavingEdit] = useState(false);
  const [contactComposer, setContactComposer] = useState(null);
  const navigate = useNavigate();
  const isOrdersTab = activeTab === "orders";

  useEffect(() => {
    let isCurrent = true;

    const loadDashboard = async () => {
      setLoading(true);
      setError("");
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        navigate("/admin/login", { replace: true });
        return;
      }

      const table = activeTab === "orders" ? "orders" : "dealership_applications";
      const { data, error: requestError } = await supabase
        .from(table)
        .select("*")
        .order("created_at", { ascending: false });

      if (!isCurrent) return;
      if (requestError) setError(requestError.message);
      else if (activeTab === "orders") setOrders(data || []);
      else setApplications(data || []);
      setLoading(false);
    };

    loadDashboard();
    return () => { isCurrent = false; };
  }, [activeTab, navigate, refreshKey]);

  const updateOrderStatus = async (id, paymentStatus) => {
    const { error: updateError } = await supabase.from("orders").update({ payment_status: paymentStatus }).eq("id", id);
    if (updateError) return window.alert(updateError.message);
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, payment_status: paymentStatus } : order)));
  };

  const updateApplicationStatus = async (id, status) => {
    const { error: updateError } = await supabase.from("dealership_applications").update({ status }).eq("id", id);
    if (updateError) return window.alert(updateError.message);
    setApplications((current) => current.map((application) => (application.id === id ? { ...application, status } : application)));
  };

  const openEdit = (type, item) => {
    setEditing({ type, id: item.id });
    setEditData(type === "order" ? {
      customer_name: item.customer_name || "",
      mobile: item.mobile || "",
      village: item.village || "",
      product_name: item.product_name || "",
      payment_status: item.payment_status || "Pending",
    } : {
      dealer_name: item.dealer_name || "",
      firm_name: item.firm_name || "",
      mobile: item.mobile || "",
      whatsapp: item.whatsapp || "",
      email: item.email || "",
      address: item.address || "",
      district: item.district || "",
      state: item.state || "",
      pincode: item.pincode || "",
      taluka: item.taluka || "",
      village_city: item.village_city || "",
      firm_type: item.firm_type || "",
      pan_number: item.pan_number || "",
      gst_number: item.gst_number || "",
      fertilizer_license: item.fertilizer_license || "",
      pesticide_license: item.pesticide_license || "",
      business_type: item.business_type || "",
      annual_turnover: item.annual_turnover ?? "",
      sales_target: item.sales_target ?? "",
      declaration_accepted: Boolean(item.declaration_accepted),
      deposit_amount: item.deposit_amount ?? "",
      experience: item.experience || "",
      message: item.message || "",
      status: item.status || "New",
    });
  };

  const saveEdit = async (event) => {
    event.preventDefault();
    if (!editing) return;
    setSavingEdit(true);
    const isOrder = editing.type === "order";
    const payload = isOrder ? editData : {
      ...editData,
      deposit_amount: editData.deposit_amount === "" ? null : Number(editData.deposit_amount),
      annual_turnover: editData.annual_turnover === "" ? null : Number(editData.annual_turnover),
      sales_target: editData.sales_target === "" ? null : Number(editData.sales_target),
    };
    const table = isOrder ? "orders" : "dealership_applications";
    const { error: updateError } = await supabase.from(table).update(payload).eq("id", editing.id);
    setSavingEdit(false);

    if (updateError) {
      window.alert(updateError.message);
      return;
    }

    if (isOrder) setOrders((current) => current.map((item) => (item.id === editing.id ? { ...item, ...payload } : item)));
    else setApplications((current) => current.map((item) => (item.id === editing.id ? { ...item, ...payload } : item)));
    setEditing(null);
  };

  const deleteRecord = async (type, id, label) => {
    if (!window.confirm(`Delete ${label}? This action cannot be undone.`)) return;
    const table = type === "order" ? "orders" : "dealership_applications";
    const { data: deletedRows, error: deleteError } = await supabase
      .from(table)
      .delete()
      .eq("id", id)
      .select("id");

    if (deleteError || !deletedRows?.length) {
      window.alert(
        deleteError?.message
          || "The record was not deleted from the database. Check the Supabase delete permission for this table."
      );
      return;
    }

    setRefreshKey((key) => key + 1);
  };

  const openContactComposer = (type, item, requestDocuments = false) => {
    const name = type === "order" ? item.customer_name : item.dealer_name;
    const defaultMessage = requestDocuments
      ? `Hello ${name || ""},\n\nThank you for your interest in Reliaf Agrotech. To continue with your dealership application, please share the required documents and details at your earliest convenience.\n\nRequired documents:\n• GST certificate (if applicable)\n• PAN card\n• Aadhaar card\n• Business address proof\n• Recent business / shop photographs\n\nThank you.`
      : `Hello ${name || ""},\n\nGreetings from Reliaf Agrotech. We are contacting you regarding your ${type === "order" ? "order" : "dealership application"}. Please let us know if you need any assistance.\n\nThank you.`;
    setContactComposer({
      name: name || "Customer",
      mobile: item.mobile || "",
      email: item.email || "",
      message: defaultMessage,
      subject: requestDocuments ? "Documents required for your dealership application" : "Reliaf Agrotech follow-up",
    });
  };

  const sendWhatsApp = () => {
    if (!contactComposer?.mobile) return window.alert("No mobile number is available for this record.");
    const phone = contactComposer.mobile.replace(/\D/g, "").replace(/^0+/, "");
    const indianPhone = phone.length === 10 ? `91${phone}` : phone;
    window.open(`https://wa.me/${indianPhone}?text=${encodeURIComponent(contactComposer.message)}`, "_blank", "noopener,noreferrer");
  };

  const sendEmail = () => {
    if (!contactComposer?.email) return window.alert("No email address is available for this record.");
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(contactComposer.email)}&su=${encodeURIComponent(contactComposer.subject)}&body=${encodeURIComponent(contactComposer.message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const orderStats = useMemo(() => {
    const count = (status) => orders.filter((order) => (order.payment_status || "Pending") === status).length;
    const productCounts = {};
    orders.forEach((order) => {
      (order.product_name || "").split(",").forEach((product) => {
        const name = product.replace(/\s*\(\d+\)\s*/g, "").trim();
        if (name) productCounts[name] = (productCounts[name] || 0) + 1;
      });
    });
    const topProducts = Object.entries(productCounts).sort(([, a], [, b]) => b - a).slice(0, 3);
    return {
      pending: count("Pending"), confirmed: count("Confirmed"), dispatched: count("Dispatched"), delivered: count("Delivered"),
      customers: new Set(orders.map((order) => order.mobile).filter(Boolean)).size,
      deliveryRate: orders.length ? Math.round((count("Delivered") / orders.length) * 100) : 0,
      topProducts,
    };
  }, [orders]);

  const applicationStats = useMemo(() => {
    const count = (status) => applications.filter((application) => (application.status || "New") === status).length;
    const deposits = applications.map((application) => Number(application.deposit_amount) || 0);
    return { new: count("New"), contacted: count("Contacted"), approved: count("Approved"), totalDeposit: deposits.reduce((total, amount) => total + amount, 0) };
  }, [applications]);

  const results = (isOrdersTab ? orders : applications).filter((item) => {
    const text = isOrdersTab
      ? `${item.customer_name || ""} ${item.mobile || ""} ${item.village || ""}`
      : `${item.dealer_name || ""} ${item.firm_name || ""} ${item.mobile || ""} ${item.district || ""} ${item.taluka || ""} ${item.village_city || ""}`;
    return text.toLowerCase().includes(search.toLowerCase());
  });

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50 font-semibold text-green-800">Loading dashboard...</div>;
  }

  const switchTab = (tab) => { setActiveTab(tab); setSearch(""); };

  return (
    <div className="min-h-screen bg-[#f5faf7] p-4 text-slate-800 sm:p-7 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-3xl bg-gradient-to-r from-green-950 via-green-800 to-emerald-700 px-6 py-7 text-white shadow-xl sm:px-9">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-100"><FaChartLine /> Operations overview</div>
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Admin Dashboard</h1>
              <p className="mt-2 max-w-xl text-emerald-50/90">Track orders, manage dealership applications, and act on work that needs attention.</p>
            </div>
            <button onClick={async () => { await supabase.auth.signOut(); navigate("/admin/login"); }} className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-3 font-semibold ring-1 ring-white/30 transition hover:bg-red-500"><FaSignOutAlt /> Logout</button>
          </div>
        </header>

        <div className="sticky top-3 z-10 mt-6 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur">
          <button onClick={() => switchTab("orders")} className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 font-semibold transition ${isOrdersTab ? "bg-green-700 text-white shadow" : "text-slate-600 hover:bg-green-50"}`}><FaBoxOpen /> Orders <span className={`rounded-full px-2 py-0.5 text-xs ${isOrdersTab ? "bg-white/20" : "bg-slate-100"}`}>{orders.length}</span></button>
          <button onClick={() => switchTab("applications")} className={`inline-flex items-center gap-2 rounded-xl px-4 py-3 font-semibold transition ${!isOrdersTab ? "bg-green-700 text-white shadow" : "text-slate-600 hover:bg-green-50"}`}><FaStore /> Dealership applications <span className={`rounded-full px-2 py-0.5 text-xs ${!isOrdersTab ? "bg-white/20" : "bg-slate-100"}`}>{applications.length}</span></button>
          <button onClick={() => setRefreshKey((key) => key + 1)} className="ml-auto inline-flex items-center gap-2 rounded-xl px-4 py-3 font-semibold text-slate-600 hover:bg-slate-100"><FaSyncAlt /> Refresh</button>
        </div>

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">Could not load {isOrdersTab ? "orders" : "dealership applications"}: {error}</div>
        ) : (
          <>
            {isOrdersTab ? (
              <>
                <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <MetricCard label="Total orders" value={orders.length} detail="All orders in your database" icon={FaClipboardList} tone="bg-green-100 text-green-700" />
                  <MetricCard label="Needs attention" value={orderStats.pending} detail="Orders awaiting confirmation" icon={FaClock} tone="bg-amber-100 text-amber-700" />
                  <MetricCard label="In fulfillment" value={orderStats.confirmed + orderStats.dispatched} detail={`${orderStats.confirmed} confirmed · ${orderStats.dispatched} dispatched`} icon={FaTruck} tone="bg-blue-100 text-blue-700" />
                  <MetricCard label="Delivered" value={orderStats.delivered} detail={`${orderStats.deliveryRate}% delivery completion`} icon={FaCheckCircle} tone="bg-emerald-100 text-emerald-700" />
                </section>

                <section className="mt-6 grid gap-5 lg:grid-cols-3">
                  <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
                    <div className="flex items-center justify-between"><div><h2 className="font-bold text-slate-900">Order fulfillment</h2><p className="mt-1 text-sm text-slate-500">Current progress across all orders</p></div><span className="text-2xl font-extrabold text-green-700">{orderStats.deliveryRate}%</span></div>
                    <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400" style={{ width: `${orderStats.deliveryRate}%` }} /></div>
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">{orderStatuses.map((status) => <div key={status} className="rounded-xl bg-slate-50 p-3"><p className="text-xs font-semibold text-slate-500">{status}</p><p className="mt-1 text-xl font-bold">{orderStats[status.toLowerCase()]}</p></div>)}</div>
                  </div>
                  <div className="rounded-2xl bg-white p-6 shadow-sm"><div className="flex items-center gap-2"><FaUsers className="text-green-700" /><h2 className="font-bold text-slate-900">Customer & product insight</h2></div><p className="mt-4 text-3xl font-extrabold">{orderStats.customers}</p><p className="text-sm text-slate-500">unique customers</p><div className="mt-5 border-t pt-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">Top products</p>{orderStats.topProducts.length ? orderStats.topProducts.map(([name, count], index) => <div key={name} className="mt-3 flex items-center justify-between text-sm"><span className="max-w-[75%] truncate"><span className="mr-2 text-green-700">#{index + 1}</span>{name}</span><span className="rounded-full bg-green-50 px-2 py-1 font-semibold text-green-700">{count}</span></div>) : <p className="mt-3 text-sm text-slate-500">No product data yet.</p>}</div></div>
                </section>
              </>
            ) : (
              <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Total applications" value={applications.length} detail="All dealership requests" icon={FaStore} tone="bg-green-100 text-green-700" />
                <MetricCard label="New applications" value={applicationStats.new} detail="Awaiting first contact" icon={FaClock} tone="bg-amber-100 text-amber-700" />
                <MetricCard label="Contacted" value={applicationStats.contacted} detail="Follow-up in progress" icon={FaUsers} tone="bg-blue-100 text-blue-700" />
                <MetricCard label="Total deposits" value={`₹${applicationStats.totalDeposit.toLocaleString("en-IN")}`} detail={`${applicationStats.approved} applications approved`} icon={FaCheckCircle} tone="bg-emerald-100 text-emerald-700" />
              </section>
            )}

            <section className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="border-b border-slate-100 p-5 sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="font-bold text-slate-900">{isOrdersTab ? "Order management" : "Dealership applications"}</h2><p className="mt-1 text-sm text-slate-500">{results.length} result{results.length === 1 ? "" : "s"} shown</p></div><input type="search" placeholder={isOrdersTab ? "Search customer, mobile, or village..." : "Search dealer, firm, or mobile..."} className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-4 focus:ring-green-100 sm:max-w-md" value={search} onChange={(event) => setSearch(event.target.value)} /></div></div>
              <div className="overflow-x-auto">
                {isOrdersTab ? (
                  <table className="w-full min-w-[1140px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-6 py-4">Customer</th><th className="px-6 py-4">Mobile</th><th className="px-6 py-4">Village</th><th className="px-6 py-4">Products</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Order date</th><th className="px-6 py-4">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{results.map((order) => <tr key={order.id} className="transition hover:bg-green-50/50"><td className="px-6 py-4 font-semibold text-slate-900">{order.customer_name || "—"}</td><td className="px-6 py-4">{order.mobile || "—"}</td><td className="px-6 py-4">{order.village || "—"}</td><td className="max-w-xs px-6 py-4 leading-6">{order.product_name || "—"}</td><td className="px-6 py-4"><select value={order.payment_status || "Pending"} onChange={(event) => updateOrderStatus(order.id, event.target.value)} className={`rounded-lg px-3 py-2 font-semibold ring-1 outline-none ${statusClass(order.payment_status || "Pending")}`}>{orderStatuses.map((status) => <option key={status}>{status}</option>)}</select></td><td className="whitespace-nowrap px-6 py-4 text-slate-500">{order.created_at ? new Date(order.created_at).toLocaleDateString("en-IN") : "—"}</td><td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => openContactComposer("order", order)} className="rounded-lg bg-green-50 p-2 text-green-700 transition hover:bg-green-100" aria-label={`Message ${order.customer_name}`} title="WhatsApp or email"><FaWhatsapp /></button><button onClick={() => openEdit("order", order)} className="rounded-lg bg-blue-50 p-2 text-blue-700 transition hover:bg-blue-100" aria-label={`Edit ${order.customer_name}`} title="Edit order"><FaEdit /></button><button onClick={() => deleteRecord("order", order.id, `order for ${order.customer_name || "this customer"}`)} className="rounded-lg bg-red-50 p-2 text-red-700 transition hover:bg-red-100" aria-label={`Delete ${order.customer_name}`} title="Delete order"><FaTrash /></button></div></td></tr>)}</tbody></table>
                ) : (
                  <table className="w-full min-w-[1550px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th className="px-6 py-4">Dealer / firm</th><th className="px-6 py-4">Contact</th><th className="px-6 py-4">Address</th><th className="px-6 py-4">Deposit</th><th className="px-6 py-4">Experience</th><th className="px-6 py-4">Message</th><th className="px-6 py-4">Status</th><th className="px-6 py-4">Date</th><th className="px-6 py-4">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{results.map((application) => <tr key={application.id} className="align-top transition hover:bg-green-50/50"><td className="px-6 py-4"><p className="font-semibold text-slate-900">{application.dealer_name}</p><p className="mt-1 text-slate-500">{application.firm_name}</p></td><td className="px-6 py-4"><p>{application.mobile}</p><p className="mt-1 text-slate-500">{application.email}</p></td><td className="max-w-xs px-6 py-4 leading-6">{[application.address, application.district, application.state, application.pincode].filter(Boolean).join(", ")}</td><td className="px-6 py-4 font-semibold">{application.deposit_amount == null ? "—" : `₹${Number(application.deposit_amount).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</td><td className="px-6 py-4">{application.experience || "—"}</td><td className="max-w-xs px-6 py-4 leading-6">{application.message || "—"}</td><td className="px-6 py-4"><select value={application.status || "New"} onChange={(event) => updateApplicationStatus(application.id, event.target.value)} className={`rounded-lg px-3 py-2 font-semibold ring-1 outline-none ${statusClass(application.status || "New")}`}>{applicationStatuses.map((status) => <option key={status}>{status}</option>)}</select></td><td className="whitespace-nowrap px-6 py-4 text-slate-500">{application.created_at ? new Date(application.created_at).toLocaleDateString("en-IN") : "—"}</td><td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => openContactComposer("application", application)} className="rounded-lg bg-green-50 p-2 text-green-700 transition hover:bg-green-100" aria-label={`Contact ${application.dealer_name}`} title="WhatsApp or Gmail"><FaWhatsapp /></button><button onClick={() => openContactComposer("application", application, true)} className="rounded-lg bg-amber-50 p-2 text-amber-700 transition hover:bg-amber-100" aria-label={`Request documents from ${application.dealer_name}`} title="Request documents"><FaFileAlt /></button><button onClick={() => openEdit("application", application)} className="rounded-lg bg-blue-50 p-2 text-blue-700 transition hover:bg-blue-100" aria-label={`Edit ${application.dealer_name}`} title="Edit application"><FaEdit /></button><button onClick={() => deleteRecord("application", application.id, `application from ${application.dealer_name || "this dealer"}`)} className="rounded-lg bg-red-50 p-2 text-red-700 transition hover:bg-red-100" aria-label={`Delete ${application.dealer_name}`} title="Delete application"><FaTrash /></button></div></td></tr>)}</tbody></table>
                )}
                {results.length === 0 && <div className="px-6 py-16 text-center"><FaClipboardList className="mx-auto text-3xl text-slate-300" /><p className="mt-3 font-semibold text-slate-700">No {isOrdersTab ? "orders" : "applications"} found</p><p className="mt-1 text-sm text-slate-500">Try a different search or refresh the dashboard.</p></div>}
              </div>
            </section>
          </>
        )}
      </div>
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true" aria-label="Edit record">
          <form onSubmit={saveEdit} className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-wider text-green-700">Admin edit</p><h2 className="mt-1 text-2xl font-extrabold text-slate-900">Edit {editing.type === "order" ? "order" : "dealership application"}</h2></div><button type="button" onClick={() => setEditing(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close edit form">×</button></div>
            {editing.type === "order" ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1 text-sm font-semibold">Customer name<input required value={editData.customer_name} onChange={(event) => setEditData({ ...editData, customer_name: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-semibold">Mobile<input required value={editData.mobile} onChange={(event) => setEditData({ ...editData, mobile: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-semibold">Village<input value={editData.village} onChange={(event) => setEditData({ ...editData, village: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-semibold">Status<select value={editData.payment_status} onChange={(event) => setEditData({ ...editData, payment_status: event.target.value })} className="rounded-lg border p-3 font-normal">{orderStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
                <label className="grid gap-1 text-sm font-semibold sm:col-span-2">Products<input value={editData.product_name} onChange={(event) => setEditData({ ...editData, product_name: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1 text-sm font-semibold">Dealer name<input required value={editData.dealer_name} onChange={(event) => setEditData({ ...editData, dealer_name: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-semibold">Firm name<input required value={editData.firm_name} onChange={(event) => setEditData({ ...editData, firm_name: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-semibold">Mobile<input required value={editData.mobile} onChange={(event) => setEditData({ ...editData, mobile: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-semibold">WhatsApp<input value={editData.whatsapp} onChange={(event) => setEditData({ ...editData, whatsapp: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-semibold sm:col-span-2">Email<input type="email" required value={editData.email} onChange={(event) => setEditData({ ...editData, email: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-semibold sm:col-span-2">Address<input required value={editData.address} onChange={(event) => setEditData({ ...editData, address: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-semibold">District<input required value={editData.district} onChange={(event) => setEditData({ ...editData, district: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-semibold">State<input required value={editData.state} onChange={(event) => setEditData({ ...editData, state: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-semibold">PIN code<input required value={editData.pincode} onChange={(event) => setEditData({ ...editData, pincode: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-semibold">Deposit amount (₹)<input type="number" min="0" step="0.01" value={editData.deposit_amount} onChange={(event) => setEditData({ ...editData, deposit_amount: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-semibold">Experience<input value={editData.experience} onChange={(event) => setEditData({ ...editData, experience: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-semibold">Status<select value={editData.status} onChange={(event) => setEditData({ ...editData, status: event.target.value })} className="rounded-lg border p-3 font-normal">{applicationStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
                <label className="grid gap-1 text-sm font-semibold sm:col-span-2">Message<textarea rows="3" value={editData.message} onChange={(event) => setEditData({ ...editData, message: event.target.value })} className="rounded-lg border p-3 font-normal" /></label>
              </div>
            )}
            <div className="mt-7 flex justify-end gap-3"><button type="button" onClick={() => setEditing(null)} className="rounded-xl px-5 py-3 font-semibold text-slate-600 hover:bg-slate-100">Cancel</button><button type="submit" disabled={savingEdit} className="rounded-xl bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60">{savingEdit ? "Saving..." : "Save changes"}</button></div>
          </form>
        </div>
      )}
      {contactComposer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="dialog" aria-modal="true" aria-label="Send message">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-wider text-green-700">Contact customer</p><h2 className="mt-1 text-2xl font-extrabold text-slate-900">Message {contactComposer.name}</h2><p className="mt-1 text-sm text-slate-500">Edit the message, then open WhatsApp or Gmail.</p></div><button type="button" onClick={() => setContactComposer(null)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Close message composer">×</button></div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="grid gap-1 text-sm font-semibold">Mobile number<input value={contactComposer.mobile} onChange={(event) => setContactComposer({ ...contactComposer, mobile: event.target.value })} className="rounded-lg border p-3 font-normal" /></label><label className="grid gap-1 text-sm font-semibold">Email address<input type="email" value={contactComposer.email} onChange={(event) => setContactComposer({ ...contactComposer, email: event.target.value })} className="rounded-lg border p-3 font-normal" /></label><label className="grid gap-1 text-sm font-semibold sm:col-span-2">Email subject<input value={contactComposer.subject} onChange={(event) => setContactComposer({ ...contactComposer, subject: event.target.value })} className="rounded-lg border p-3 font-normal" /></label><label className="grid gap-1 text-sm font-semibold sm:col-span-2">Message<textarea rows="10" value={contactComposer.message} onChange={(event) => setContactComposer({ ...contactComposer, message: event.target.value })} className="rounded-lg border p-3 font-normal" /></label></div>
            <div className="mt-7 flex flex-wrap justify-end gap-3"><button type="button" onClick={() => setContactComposer(null)} className="rounded-xl px-5 py-3 font-semibold text-slate-600 hover:bg-slate-100">Cancel</button><button type="button" onClick={sendEmail} className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"><FaEnvelope /> Open Gmail</button><button type="button" onClick={sendWhatsApp} className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"><FaWhatsapp /> Open WhatsApp</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
