import React from "react";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaLeaf,
  FaChartLine,
  FaTruck,
} from "react-icons/fa";

const benefits = [
  {
    icon: <FaLeaf size={40} className="text-green-600" />,
    title: "Premium Products",
    desc: "High-quality bio fertilizers and crop nutrition products trusted by farmers."
  },
  {
    icon: <FaChartLine size={40} className="text-green-600" />,
    title: "Good Profit Margin",
    desc: "Earn attractive margins with seasonal schemes and dealer incentives."
  },
  {
    icon: <FaTruck size={40} className="text-green-600" />,
    title: "Fast Delivery",
    desc: "Reliable dispatch and delivery across India."
  },
  {
    icon: <FaUsers size={40} className="text-green-600" />,
    title: "Marketing Support",
    desc: "Field demonstrations, banners, product training and promotional support."
  }
];

export default function Dealership() {

  return (

    <div className="bg-gray-50">

      {/* Hero */}

      <section className="min-h-screen flex items-center bg-gradient-to-r from-green-700 to-green-500 text-white">

        <div className="max-w-7xl mx-auto px-6 py-24">

          <h1 className="text-5xl font-bold mb-6">

            Become a Reliaf Agrotech Dealer

          </h1>

          <p className="text-xl max-w-3xl">

            Join our rapidly growing dealer network and help farmers
            achieve better productivity with Reliaf Agrotech's
            innovative agricultural solutions.

          </p>

          <div className="mt-10">

            <a
              href="#dealer-form"
              className="bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100"
            >
              Apply Now
            </a>

          </div>

        </div>

      </section>

      {/* Why Join */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-4">

            Why Join Reliaf Agrotech?

          </h2>

          <p className="text-center text-gray-600 mb-14">

            We empower our dealers with premium products,
            strong technical support, and profitable business opportunities.

          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {benefits.map((item, index) => (

              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition"
              >

                <div className="flex justify-center mb-4">

                  {item.icon}

                </div>

                <h3 className="text-xl font-semibold mb-3">

                  {item.title}

                </h3>

                <p className="text-gray-600">

                  {item.desc}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Dealer Form Placeholder */}

      <section
        id="dealer-form"
        className="max-w-7xl mx-auto px-6 py-20"
      >

        <div className="bg-white rounded-xl shadow-xl p-10">

          <h2 className="text-3xl font-bold text-center mb-4">

            Dealer Registration Form

          </h2>

          <p className="text-center text-gray-600 mb-10">

            Complete the form below to apply for a Reliaf Agrotech dealership.

          </p>

          {/* Form will be added in Part 2 */}

        </div>

      </section>

    </div>

  );

}