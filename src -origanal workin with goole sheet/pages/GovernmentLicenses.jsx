export default function GovernmentLicenses() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-6">
    <button
      onClick={() => window.history.back()}
      className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition mb-6"
    >
      ← Back to Quality
    </button>
      <h1 className="text-4xl font-bold text-green-700 mb-6">
        Government Licenses
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        <div className="shadow-lg rounded-lg p-6">
          <h3 className="font-bold text-xl">
            ISO Certification
          </h3>
          <p>
            Certified quality management systems ensuring consistency.
          </p>
        </div>

        <div className="shadow-lg rounded-lg p-6">
          <h3 className="font-bold text-xl">
            Government Licenses
          </h3>
          <p>
            Bio Fertilizer and Agriculture Input approvals.
          </p>
        </div>

      </div>
    </div>
  );
}