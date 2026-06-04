export default function ReliafAgrotechWebsite() {
  const languages = ['English', 'मराठी', 'हिंदी'];
  const products = [
    {
      title: 'Root Faster 98%',
      image: '/Root Faster 98%.jpeg',
      desc: 'Super Potassium Humate 98% for strong root development, better yield, and improved soil fertility.',
    },
    {
      title: 'Reliaf P+',
      image: '/P+ bacteria.png',
      desc: 'Enhances phosphorus uptake using phosphate solubilizing bacteria for healthier crops.',
    },
    {
      title: 'Reliaf K+',
      image: '/K+ bacteria.png',
      desc: 'Improves potash uptake with advanced bacteria formulation for better crop strength.',
    },
    {
      title: 'Reliaf N+',
      image: '/N+ bacatria.png',
      desc: 'Nitrogen fixation bacteria formula for greener plants and faster growth.',
    },
  ];

  const services = [
    'Modern Farming Solutions',
    'Agriculture Consultancy',
    'Crop Protection Guidance',
    'Farmer Support & Training',
  ];

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Reliaf Agrotech Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Reliaf Agrotech Pvt Ltd</h2>
                <p className="text-green-100">Trusted by Farmers</p>
              </div>
            </div>

            <div className="flex gap-3 flex-wrap">
              {languages.map((lang, index) => (
                <button
                  key={index}
                  className="bg-white/20 px-4 py-2 rounded-xl hover:bg-white hover:text-green-700 transition"
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Reliaf Agrotech Pvt Ltd
            </h1>
            <p className="text-lg md:text-xl mb-8 text-green-100">
              Empowering Farmers with Modern Agricultural Solutions for Better Growth and Higher Productivity.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="bg-white text-green-700 px-6 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition">
                Explore Products
              </button>
              <button className="border border-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-green-700 transition">
                Contact Us
              </button>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
              alt="Agriculture"
              className="rounded-3xl shadow-2xl w-full h-[420px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-6">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
            Reliaf Agrotech Pvt Ltd is dedicated to supporting farmers with innovative agricultural products and modern farming techniques. Our mission is to increase crop productivity, improve soil quality, and help farmers achieve sustainable success.
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-green-700">Our Products</h2>
            <p className="text-gray-600 mt-4">
              High-quality agricultural products designed for better farming results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-green-50 rounded-3xl p-8 shadow-md hover:shadow-2xl transition"
              >
                <div className="bg-white rounded-2xl overflow-hidden mb-6 h-[260px] flex items-center justify-center p-4 shadow-inner">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full object-contain"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-green-700">{product.title}</h3>
                <p className="text-gray-600">{product.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1200&auto=format&fit=crop"
              alt="Farm"
              className="rounded-3xl shadow-xl"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-green-700 mb-8">Why Choose Us?</h2>
            <div className="space-y-5">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-5 shadow-md flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl">
                    ✓
                  </div>
                  <p className="text-lg font-medium">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-700 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold">5000+</h3>
            <p className="mt-2">Farmers Connected</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">50+</h3>
            <p className="mt-2">Products</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">10+</h3>
            <p className="mt-2">Years Experience</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">100%</h3>
            <p className="mt-2">Farmer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-6">Contact Us</h2>
          <p className="text-gray-600 mb-10">
            Get in touch with Reliaf Agrotech Pvt Ltd for product inquiries and business support.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-green-50 rounded-3xl p-8 shadow-md">
              <h3 className="text-2xl font-semibold mb-3">📍 Address</h3>
              <p>Pune, Maharashtra, India</p>
            </div>

            <div className="bg-green-50 rounded-3xl p-8 shadow-md">
              <h3 className="text-2xl font-semibold mb-3">📞 Phone</h3>
              <p>+91 8793701270</p>
            </div>

            <div className="bg-green-50 rounded-3xl p-8 shadow-md">
              <h3 className="text-2xl font-semibold mb-3">📧 Email</h3>
              <p>reliafagrotech@gmail.com</p>
            </div>
          </div>
        </div>
      </section>

      {{/* Online Order Form */}
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-green-700">Place Your Order</h2>
            <p className="text-gray-600 mt-4">
              Fill out the form below to order our agricultural products.
            </p>
          </div>

          <form className="grid md:grid-cols-2 gap-6">
            <input type="text" placeholder="Farmer Name" className="border rounded-2xl p-4" />
            <input type="tel" placeholder="Mobile Number" className="border rounded-2xl p-4" />
            <input type="text" placeholder="Village / City" className="border rounded-2xl p-4" />
            <input type="text" placeholder="Product Name" className="border rounded-2xl p-4" />
            <textarea placeholder="Additional Requirement" rows="5" className="md:col-span-2 border rounded-2xl p-4"></textarea>

            <button className="md:col-span-2 bg-green-700 text-white py-4 rounded-2xl text-lg font-semibold hover:bg-green-800 transition">
              Submit Order
            </button>
          </form>
        </div>
      </section>

      {/* Admin Dashboard */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-10">Admin Dashboard</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-green-50 p-8 rounded-3xl shadow-md">
              <h3 className="text-4xl font-bold text-green-700">150</h3>
              <p className="mt-2">Orders</p>
            </div>
            <div className="bg-green-50 p-8 rounded-3xl shadow-md">
              <h3 className="text-4xl font-bold text-green-700">80</h3>
              <p className="mt-2">Customers</p>
            </div>
            <div className="bg-green-50 p-8 rounded-3xl shadow-md">
              <h3 className="text-4xl font-bold text-green-700">50</h3>
              <p className="mt-2">Products</p>
            </div>
            <div className="bg-green-50 p-8 rounded-3xl shadow-md">
              <h3 className="text-4xl font-bold text-green-700">24/7</h3>
              <p className="mt-2">Support</p>
            </div>
          </div>
        </div>
      </section>

      <a
        href="https://wa.me/918793701270"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-4 rounded-full shadow-2xl text-lg font-bold hover:scale-105 transition z-50"
      >
        WhatsApp Us
      </a>

      {/* Footer */}}
      <footer className="bg-gray-900 text-gray-300 py-8 text-center">
        <p>
          © 2026 Reliaf Agrotech Pvt Ltd. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
