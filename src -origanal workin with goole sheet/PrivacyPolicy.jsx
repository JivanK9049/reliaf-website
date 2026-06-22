import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PrivacyPolicy() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="min-h-screen bg-green-50">

      {/* Top Bar */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-5 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <a
            href="/"
            className="bg-white text-green-700 px-4 py-2 rounded-xl font-semibold shadow hover:bg-green-50"
          >
            🏠 Back to Home
          </a>

          <img
            src="/logo.png"
            alt="Reliaf Agrotech"
            className="h-16 md:h-20"
          />

        </div>
      </div>

      {/* Hero Section */}

      <section
  className="relative text-white py-32 bg-cover bg-center overflow-hidden"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,80,40,0.75), rgba(0,80,40,0.75)), url('/farmer-field.jpg')"
  }}
>

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Privacy Policy
          </h1>

          <p className="text-xl max-w-4xl mx-auto leading-8">
            Our commitment to quality is reflected in every aspect of our operations.
            This policy outlines our standards and practices to ensure the highest quality
            in all our products and services.
          </p>

        </div>

      </section>

      {/* Introduction */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
            Introduction
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <p className="text-lg text-gray-700 leading-8 text-center">
              Reliaf Agrotech Pvt Ltd respects your privacy and is committed
              to protecting the personal information you provide while using
              our website, products and services.
            </p>

          </div>

        </div>

      </section>

      {/* Information Collection */}

      <section className="pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
            Information We Collect
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
              <h3 className="text-xl font-bold text-green-700">
                👤 Name
              </h3>
              <p className="mt-3 text-gray-600">
                Customer and dealer details.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
              <h3 className="text-xl font-bold text-green-700">
                📱 Mobile Number
              </h3>
              <p className="mt-3 text-gray-600">
                For communication and support.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
              <h3 className="text-xl font-bold text-green-700">
                📧 Email Address
              </h3>
              <p className="mt-3 text-gray-600">
                For updates and notifications.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
              <h3 className="text-xl font-bold text-green-700">
                📍 Location Details
              </h3>
              <p className="mt-3 text-gray-600">
                Village, city and state information.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* How We Use Information */}

      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
            How We Use Your Information
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-green-50 p-8 rounded-3xl shadow">
              <ul className="space-y-4 text-gray-700">
                <li>✔ Respond to inquiries and support requests</li>
                <li>✔ Process product orders and dealer applications</li>
                <li>✔ Improve customer service experience</li>
              </ul>
            </div>

            <div className="bg-green-50 p-8 rounded-3xl shadow">
              <ul className="space-y-4 text-gray-700">
                <li>✔ Send important updates and notifications</li>
                <li>✔ Improve website functionality</li>
                <li>✔ Maintain business records and compliance</li>
              </ul>
            </div>

          </div>

        </div>

      </section>

      {/* Data Security */}

      <section className="py-20 bg-green-50">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
            Data Protection & Security
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <p className="text-lg text-gray-700 leading-8 text-center">
              We implement appropriate security measures to protect your
              personal information against unauthorized access, disclosure,
              alteration or misuse. However, no internet transmission can
              be guaranteed to be 100% secure.
            </p>

          </div>

        </div>

      </section>

      {/* Cookies */}

      <section className="py-20 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
            Cookies Policy
          </h2>

          <div className="bg-green-50 rounded-3xl shadow-xl p-10">

            <p className="text-lg text-gray-700 leading-8 text-center">
              Our website may use cookies and analytics tools to improve
              user experience, understand website traffic and optimize
              website performance.
            </p>

          </div>

        </div>

      </section>

      {/* Third Party Services */}

      <section className="py-20 bg-green-50">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
            Third Party Services
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <p className="text-lg text-gray-700 leading-8 text-center">
              We may use trusted third-party services such as Google Analytics,
              Google Forms, Google Sheets and email service providers for
              operational purposes. These services maintain their own privacy policies.
            </p>

          </div>

        </div>

      </section>

      {/* User Rights */}

      <section className="py-20 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-700 mb-8">
            User Rights
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-green-50 p-6 rounded-3xl shadow text-center">
              Access Information
            </div>

            <div className="bg-green-50 p-6 rounded-3xl shadow text-center">
              Update Information
            </div>

            <div className="bg-green-50 p-6 rounded-3xl shadow text-center">
              Request Data Removal
            </div>

          </div>

        </div>

      </section>
      <section className="py-20 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
      Trusted By Farmers
    </h2>

    <div className="grid md:grid-cols-4 gap-6">

      <div className="bg-green-50 p-8 rounded-3xl shadow-xl text-center">
        <h3 className="text-5xl font-bold text-green-700">5000+</h3>
        <p>Farmers Connected</p>
      </div>

      <div className="bg-green-50 p-8 rounded-3xl shadow-xl text-center">
        <h3 className="text-5xl font-bold text-green-700">50+</h3>
        <p>Products</p>
      </div>

      <div className="bg-green-50 p-8 rounded-3xl shadow-xl text-center">
        <h3 className="text-5xl font-bold text-green-700">10+</h3>
        <p>Districts Covered</p>
      </div>

      <div className="bg-green-50 p-8 rounded-3xl shadow-xl text-center">
        <h3 className="text-5xl font-bold text-green-700">98%</h3>
        <p>Satisfaction</p>
      </div>

    </div>

  </div>

</section>

<section className="py-20 bg-white">

  <div className="max-w-5xl mx-auto">

    <div className="bg-green-700 text-white rounded-3xl p-10 text-center">

      <img
        src="/director2.png"
        alt="Director"
        className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white"
      />

      <h2 className="text-3xl font-bold mb-4">
        Message From Leadership
      </h2>

      <p className="text-xl leading-8">
        "Trust, transparency and farmer success are the foundation
        of every relationship we build."
      </p>

    </div>

  </div>

</section>

      {/* Footer */}

      <footer className="bg-gray-900 text-white py-8 text-center">

        <p className="font-bold text-lg">
          Reliaf Agrotech Pvt Ltd
        </p>

        <p className="text-gray-400 mt-2">
          Empowering Farmers Through Innovation
        </p>
        <div className="mt-4 space-y-2">
          <p>📍 Maharashtra, India</p>
		      <p>📞 7774893247</p>
		      <p>📞 9075330820</p>
          <p>🌐 www.reliafagrotech.com</p>
        </div>

      </footer>

    </div>
  );
}

