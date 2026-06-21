export default function ProductQuality() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition mb-6"
    >
      ← Back to Quality
    </button>
      <h1 className="text-4xl font-bold text-green-700 mb-6">
        Product Quality
      </h1>

      <p className="text-lg text-gray-700">
        Reliaf Agrotech products are manufactured using premium quality
        raw materials and strict quality standards to ensure maximum
        effectiveness and farmer satisfaction.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="p-6 shadow rounded-lg">
          <h3 className="font-bold mb-2">100% Quality Raw Material</h3>
          <p>Only verified and tested inputs are used.</p>
        </div>

        <div className="p-6 shadow rounded-lg">
          <h3 className="font-bold mb-2">Batch Testing</h3>
          <p>Every production batch undergoes testing.</p>
        </div>

        <div className="p-6 shadow rounded-lg">
          <h3 className="font-bold mb-2">Field Validation</h3>
          <p>Products are validated under field conditions.</p>
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