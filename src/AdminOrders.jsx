import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
useEffect(() => {
  checkAuth();
}, []);

async function checkAuth() {
  setLoading(true);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    navigate("/admin/login", { replace: true });
    return;
  }

  fetchOrders();
}

  async function fetchOrders() {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setOrders(data || []);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }
async function updateStatus(id, status) {
  const { error } = await supabase
    .from("orders")
    .update({
      payment_status: status
    })
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  fetchOrders();
}
const filteredOrders = orders.filter((order) =>
  order.customer_name
    ?.toLowerCase()
    .includes(search.toLowerCase())
);
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Checking Authentication...
    </div>
  );
}
  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-4xl font-bold text-green-700 mb-8">
        Admin Orders Dashboard
      </h1>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          navigate("/admin/login");
        }}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
      {loading ? (
        <p>Loading Orders...</p>
      ) : (
        <div className="overflow-auto bg-white rounded-xl shadow-lg">
          <div className="grid md:grid-cols-5 gap-4 mb-8">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Orders</h3>
          <p className="text-3xl font-bold">
            {orders.length}
          </p>
        </div>

        <div className="bg-yellow-500 p-4 rounded-xl shadow">
          <h3>Pending</h3>
          <p className="text-3xl font-bold">
            {orders.filter(
              o => o.payment_status === "Pending"
          
            ).length}
          </p>
        </div>

        <div className="bg-blue-500 p-4 rounded-xl shadow">
          <h3>Confirmed</h3>
          <p className="text-3xl font-bold">
            {orders.filter(
              o => o.payment_status === "Confirmed"
            ).length}
          </p>
        </div>

        <div className="bg-orange-500 p-4 rounded-xl shadow">
          <h3>Dispatched</h3>
          <p className="text-3xl font-bold">
            {orders.filter(
              o => o.payment_status === "Dispatched"
            ).length}
          </p>
        </div>

        <div className="bg-green-500 p-4 rounded-xl shadow">
          <h3>Delivered</h3>
          <p className="text-3xl font-bold">
            {orders.filter(
              o => o.payment_status === "Delivered"
            ).length}
          </p>
        </div>

      </div>
          <input
            type="text"
            placeholder="Search Customer..."
            className="border p-3 rounded-lg mb-4 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-700 text-white">
                <th className="p-3">ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Village</th>
                <th className="p-3">Products</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">WhatsApp</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.customer_name}</td>
                  <td className="p-3">{order.mobile}</td>
                  <td className="p-3">{order.village}</td>
                  <td className="p-3">{order.product_name}</td>
                  <td className="p-3">
                    <select
                      value={order.payment_status}
                      onChange={(e) =>
                        updateStatus(order.id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option>Pending</option>
                      <option>Confirmed</option>
                      <option>Dispatched</option>
                      <option>Delivered</option>
                    </select>
                  </td>
                  <td className="p-3">
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <a
                      href={`https://wa.me/91${order.mobile}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}