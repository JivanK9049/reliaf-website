export default function ManufacturingQuality() {
  return (
    <div className="min-h-screen bg-green-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Manufacturing Quality Check
        </h1>

        <p className="mt-4 text-xl">
          Scientific Research • Advanced Testing • Quality Assured
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">

        <button
          onClick={() => window.history.back()}
          className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 mb-8"
        >
          ← Back to Quality
        </button>

        {/* Image 1 */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-10">
          <img
            src="/research-quality.png"
            alt="Research Based Better Results"
            className="w-full"
          />

          <div className="p-8">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Research Based Better Results
            </h2>

            <p className="text-lg text-gray-700">
              Every Reliaf product undergoes scientific research,
              advanced testing and strict quality verification to
              ensure better crop productivity and farmer success.
            </p>
          </div>
        </div>

        {/* Image 2 */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-10">
          <img
            src="/labtestphoto.png"
            alt="Laboratory Quality Testing"
            className="w-full"
          />

          <div className="p-8">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Laboratory Testing & Quality Assurance
            </h2>

            <p className="text-lg text-gray-700">
              Our laboratory team performs detailed testing of raw
              materials and finished products to ensure purity,
              stability, effectiveness and consistency.
            </p>
          </div>
        </div>

        {/* Quality Cards */}
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h3 className="font-bold text-green-700 mb-2">
              Scientific Research
            </h3>
            <p>Research-driven product development.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h3 className="font-bold text-green-700 mb-2">
              Advanced Testing
            </h3>
            <p>Comprehensive laboratory validation.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h3 className="font-bold text-green-700 mb-2">
              Quality Assured
            </h3>
            <p>Strict quality control at every stage.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <h3 className="font-bold text-green-700 mb-2">
              Safe For Crops
            </h3>
            <p>Farmer-focused and environmentally responsible.</p>
          </div>

        </div>

      </div>
    <section className="py-20 bg-white">

  <div className="max-w-5xl mx-auto">

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
        "Trust, transparency and farmer success are the foundation
        of every relationship we build."
      </p>

    </div>

  </div>

      </section>
    </div>
  );
}