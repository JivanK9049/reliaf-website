export default function Careers() {
  return (
    <div className="min-h-screen bg-green-50">

      {/* Hero */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Careers at Reliaf Agrotech
          </h1>

          <p className="text-xl">
            Grow your career while helping farmers grow their future.
          </p>

        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        <button
          onClick={() => window.history.back()}
          className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 mb-8"
        >
          ← Back
        </button>

        <div className="bg-white p-8 rounded-3xl shadow-xl">

          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Apply for a Position
          </h2>

          <p className="text-gray-600 mb-8">
            Join Reliaf Agrotech Pvt Ltd and contribute to innovation,
            marketing, sales and agricultural development.
          </p>

          <form
            action="https://formsubmit.co/reliafagrotech@gmail.com"
            method="POST"
            encType="multipart/form-data"
            className="space-y-5"
          >
            <input
              type="hidden"
              name="_subject"
              value="New Career Application - Reliaf Agrotech"
            />

            <input
              type="hidden"
              name="_captcha"
              value="false"
            />

            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              required
              className="w-full border p-4 rounded-xl"
            />

            <input
              type="tel"
              name="mobile_number"
              placeholder="Mobile Number"
              required
              className="w-full border p-4 rounded-xl"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full border p-4 rounded-xl"
            />

            <select
              name="position"
              className="w-full border p-4 rounded-xl"
              required
            >
              <option value="">Select Position</option>
              <option>Sales Officer</option>
              <option>Agriculture Officer</option>
              <option>Marketing Executive</option>
              <option>Area Sales Manager</option>
              <option>Production Executive</option>
              <option>Quality Control Executive</option>
            </select>

            <input
              type="text"
              name="experience"
              placeholder="Experience"
              className="w-full border p-4 rounded-xl"
            />

            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="w-full border p-4 rounded-xl"
            />

            <button
              type="submit"
              className="w-full bg-green-700 text-white py-4 rounded-xl font-bold hover:bg-green-800"
            >
              Apply Now
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}