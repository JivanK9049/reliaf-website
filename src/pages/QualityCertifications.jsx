export default function QualityCertifications() {
  return (
    <div className="min-h-screen bg-green-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Quality Certifications
        </h1>

        <p className="mt-4 text-xl">
          Certified Quality • Trusted Performance • Global Standards
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 mb-8"
        >
          ← Back to Quality
        </button>

        {/* ISO Certificate */}
        <div data-aos="fade-up" className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">

          <img
            src="/ISO.png"
            alt="ISO 9001:2015 Certificate"
            className="w-full" loading="lazy"
          />

          <div className="p-8">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              ISO 9001:2015 Certified Company
            </h2>

            <p className="text-lg text-gray-700 leading-8">
              Reliaf Agrotech Private Limited is certified under
              ISO 9001:2015 Quality Management System standards.
              This certification demonstrates our commitment to
              maintaining consistent quality, continuous improvement,
              customer satisfaction, and internationally recognized
              manufacturing processes.
            </p>
          </div>

        </div>

        {/* Certification Details */}

        <div className="grid md:grid-cols-2 gap-8">

          <div data-aos="fade-right" className="bg-white p-8 rounded-3xl shadow-xl transition hover:-translate-y-1">
            <h3 className="text-2xl font-bold text-green-700 mb-4">
              Certification Scope
            </h3>

            <ul className="space-y-3 text-gray-700">
              <li>✓ Bio Stimulants Manufacturing</li>
              <li>✓ Bio Fertilizer Manufacturing</li>
              <li>✓ Organic Fertilizer Production</li>
              <li>✓ Micronutrient Fertilizers</li>
              <li>✓ NPK Fertilizers</li>
              <li>✓ Agricultural Input Solutions</li>
            </ul>
          </div>

          <div data-aos="fade-left" className="bg-white p-8 rounded-3xl shadow-xl transition hover:-translate-y-1">
            <h3 className="text-2xl font-bold text-green-700 mb-4">
              Quality Commitment
            </h3>

            <ul className="space-y-3 text-gray-700">
              <li>✓ Strict Quality Control</li>
              <li>✓ Scientific Research & Development</li>
              <li>✓ Advanced Laboratory Testing</li>
              <li>✓ Farmer-Centric Innovation</li>
              <li>✓ Sustainable Agriculture Solutions</li>
              <li>✓ Continuous Process Improvement</li>
            </ul>
          </div>

        </div>

        {/* Bottom Stats */}

        <div className="grid md:grid-cols-4 gap-6 mt-12">

          <div data-aos="zoom-in" className="bg-white p-6 rounded-3xl shadow-xl text-center">
            <h3 className="text-4xl font-bold text-green-700">ISO</h3>
            <p>9001:2015 Certified</p>
          </div>

          <div data-aos="zoom-in" data-aos-delay="70" className="bg-white p-6 rounded-3xl shadow-xl text-center">
            <h3 className="text-4xl font-bold text-green-700">5000+</h3>
            <p>Farmers Served</p>
          </div>

          <div data-aos="zoom-in" data-aos-delay="140" className="bg-white p-6 rounded-3xl shadow-xl text-center">
            <h3 className="text-4xl font-bold text-green-700">50+</h3>
            <p>Quality Products</p>
          </div>

          <div data-aos="zoom-in" data-aos-delay="210" className="bg-white p-6 rounded-3xl shadow-xl text-center">
            <h3 className="text-4xl font-bold text-green-700">98%</h3>
            <p>Customer Satisfaction</p>
          </div>

        </div>

      </div>
          <section className="py-20 bg-white">

  <div className="max-w-5xl mx-auto">

    <div className="bg-green-700 text-white rounded-3xl p-10 text-center">

      <img
        src="/director3.png"
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
    </div>
  );
}
