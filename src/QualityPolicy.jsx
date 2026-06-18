import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function QualityPolicy() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen bg-green-50">

      {/* Header */}
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
        className="relative text-white py-32 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,80,40,0.75), rgba(0,80,40,0.75)), url('/research-quality.png')"
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Quality Policy
          </h1>

          <p className="text-xl md:text-2xl max-w-4xl mx-auto">
            Delivering Trusted Agricultural Solutions Through
            Research, Innovation and Uncompromising Quality Standards.
          </p>

        </div>
      </section>

      {/* Quality Commitment */}

      <section className="py-20" data-aos="fade-up">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
            Quality Commitment
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-10">

            <p className="text-lg text-gray-700 leading-8 text-center">
              Reliaf Agrotech Pvt Ltd is committed to delivering
              high-quality Bio-Fertilizers, Bio-Stimulants and
              Agricultural Solutions. We maintain strict quality
              standards, utilize premium raw materials and continuously
              improve our products to maximize farmer success,
              crop productivity and sustainable agriculture.
            </p>

          </div>

        </div>

      </section>

      {/* Core Principles */}

      <section className="pb-20" data-aos="zoom-in">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white p-8 rounded-3xl shadow-xl text-center hover:-translate-y-2 transition">
              <h3 className="text-2xl mb-3">🌱</h3>
              <h3 className="font-bold text-green-700">Premium Quality</h3>
              <p className="mt-3 text-gray-600">
                Carefully selected raw materials.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl text-center hover:-translate-y-2 transition">
              <h3 className="text-2xl mb-3">🔬</h3>
              <h3 className="font-bold text-green-700">Scientific Research</h3>
              <p className="mt-3 text-gray-600">
                Continuous innovation and testing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl text-center hover:-translate-y-2 transition">
              <h3 className="text-2xl mb-3">👨‍🌾</h3>
              <h3 className="font-bold text-green-700">Farmer Focus</h3>
              <p className="mt-3 text-gray-600">
                Solutions designed for real field conditions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl text-center hover:-translate-y-2 transition">
              <h3 className="text-2xl mb-3">♻️</h3>
              <h3 className="font-bold text-green-700">Sustainability</h3>
              <p className="mt-3 text-gray-600">
                Promoting long-term soil health.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Research & Development */}

      <section className="py-20 bg-white" data-aos="fade-up">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
            Research & Development
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-green-50 p-8 rounded-3xl text-center shadow">
              <h3 className="text-5xl font-bold text-green-700">50+</h3>
              <p>Products Developed</p>
            </div>

            <div className="bg-green-50 p-8 rounded-3xl text-center shadow">
              <h3 className="text-5xl font-bold text-green-700">5000+</h3>
              <p>Farmers Served</p>
            </div>

            <div className="bg-green-50 p-8 rounded-3xl text-center shadow">
              <h3 className="text-5xl font-bold text-green-700">100+</h3>
              <p>Field Trials</p>
            </div>

            <div className="bg-green-50 p-8 rounded-3xl text-center shadow">
              <h3 className="text-5xl font-bold text-green-700">98%</h3>
              <p>Farmer Satisfaction</p>
            </div>

          </div>

        </div>

      </section>

      {/* Manufacturing Standards */}

      <section className="py-20 bg-green-50" data-aos="fade-right">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
            Manufacturing Standards
          </h2>

          <div className="grid md:grid-cols-5 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow text-center">
              Raw Material Selection
            </div>

            <div className="bg-white p-6 rounded-2xl shadow text-center">
              Quality Inspection
            </div>

            <div className="bg-white p-6 rounded-2xl shadow text-center">
              Production Process
            </div>

            <div className="bg-white p-6 rounded-2xl shadow text-center">
              Batch Testing
            </div>

            <div className="bg-white p-6 rounded-2xl shadow text-center">
              Distribution Quality Check
            </div>

          </div>

        </div>

      </section>

      {/* Product Testing */}

      <section className="py-20 bg-white" data-aos="zoom-in">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
            Product Testing Process
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-green-50 p-8 rounded-3xl shadow text-center">
              Laboratory Testing
            </div>

            <div className="bg-green-50 p-8 rounded-3xl shadow text-center">
              Quality Validation
            </div>

            <div className="bg-green-50 p-8 rounded-3xl shadow text-center">
              Field Trials
            </div>

            <div className="bg-green-50 p-8 rounded-3xl shadow text-center">
              Farmer Feedback
            </div>

          </div>

        </div>

      </section>

      {/* Certifications */}

      <section className="py-20 bg-green-50" data-aos="fade-up">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
            Certifications & Compliance
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
              ISO Certification
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
              Bio Fertilizer License
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
              Bio Stimulant License
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
              GST Registration
            </div>

          </div>

        </div>

      </section>

      {/* Leadership Message */}

      <section className="py-20 bg-white">

        <div className="max-w-5xl mx-auto px-6">

          <div className="bg-green-700 text-white rounded-3xl p-10 text-center">

            <img
              src="/director1.png"
              alt="Director"
              className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white"
            />

            <h2 className="text-3xl font-bold mb-4">
              Message From Leadership
            </h2>

            <p className="text-xl leading-8">
              "Quality is not just a process. It is our promise to every farmer
              who places trust in Reliaf Agrotech products."
            </p>

          </div>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-gray-900 text-white py-10 text-center">

        <h3 className="text-2xl font-bold">
          Reliaf Agrotech Pvt Ltd
        </h3>

        <p className="text-gray-400 mt-3">
          Empowering Farmers Through Innovation
        </p>

        <div className="mt-4 space-y-2">
          <p>📍 Maharashtra, India</p>
          <p>📞 8793701270</p>
          <p>🌐 www.reliafagrotech.com</p>
        </div>

      </footer>

    </div>
  );
}

