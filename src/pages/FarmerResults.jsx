export default function FarmerResults() {
  const images = [
    "/result1.png",
    "/result2.png",
    "/result3.png",
    "/result4.png",
    "/result5.png",
    "/result6.png",
    "/result7.png",
    "/result8.png",
    "/result9.png",
  ];

  return (
    <div className="min-h-screen bg-green-50">

      {/* HERO SECTION */}
      <div
        className="relative h-[350px] md:h-[500px] flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,80,30,0.65), rgba(0,80,30,0.65)), url('/result5.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Farmer Success Stories
          </h1>

          <p className="text-lg md:text-2xl">
            Real Farmers • Real Results • Proven Performance
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition mb-8"
        >
          ← Back to Quality
        </button>

        {/* Result Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          <div data-aos="fade-up" className="bg-white shadow-xl rounded-2xl p-6 transition hover:-translate-y-1">
            <h3 className="font-bold text-xl mb-2 text-green-700">
              Root Development
            </h3>
            <p>
              Improved root growth, stronger plants and better nutrient uptake.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="80" className="bg-white shadow-xl rounded-2xl p-6 transition hover:-translate-y-1">
            <h3 className="font-bold text-xl mb-2 text-green-700">
              Yield Improvement
            </h3>
            <p>
              Higher productivity and improved crop quality.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="160" className="bg-white shadow-xl rounded-2xl p-6 transition hover:-translate-y-1">
            <h3 className="font-bold text-xl mb-2 text-green-700">
              Soil Health
            </h3>
            <p>
              Better microbial activity and enhanced soil fertility.
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay="240" className="bg-white shadow-xl rounded-2xl p-6 transition hover:-translate-y-1">
            <h3 className="font-bold text-xl mb-2 text-green-700">
              Farmer Satisfaction
            </h3>
            <p>
              Thousands of farmers trust Reliaf products for consistent results.
            </p>
          </div>

        </div>

        {/* Farmer Gallery */}
        <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
          Field Results Gallery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {images.map((img, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={(index % 3) * 75}
              className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <img
                src={img}
                alt={`Farmer Result ${index + 1}`}
                className="w-full h-80 object-cover" loading="lazy"
              />

              <div className="p-5">
                <h3 className="font-bold text-lg text-green-700">
                  Farmer Success Story #{index + 1}
                </h3>

                <p className="text-gray-600 mt-2">
                  Demonstrated field performance and farmer satisfaction using Reliaf products.
                </p>
              </div>
            </div>
          ))}

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
