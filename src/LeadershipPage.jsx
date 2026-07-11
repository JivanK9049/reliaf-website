import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaLeaf, FaLightbulb, FaLocationDot, FaPhone } from "react-icons/fa6";

const leaders = [
  {
    name: "Mr. Shashikant Kulkarni",
    role: "Founder & Managing Director",
    image: "/director1.png",
    experience: "30+",
    experienceLabel: "Years of experience",
    focus: "Farmer Guidance",
    focusLabel: "Production management",
    description: "Mr. Shashikant Kulkarni brings more than 30 years of experience in agribusiness, sustainable farming, product development, and production management. He leads Reliaf’s strategic vision by pairing agricultural innovation with eco-friendly farming practices that help improve crop productivity and support rural farming communities.",
  },
  {
    name: "Mr. Vishvajeet Jagtap",
    role: "Founder, Director of Operations & Production Head",
    qualification: "B.Sc. Agriculture",
    image: "/director2.png",
    experience: "3+",
    experienceLabel: "Years of experience",
    focus: "Market Research",
    focusLabel: "Business management",
    description: "Vishvajeet Vijay Jagtap drives manufacturing excellence and operational leadership at Reliaf Agrotech. With a strong foundation in agricultural science, he oversees production facilities to uphold quality, efficiency, and innovation—ensuring every product is optimised for effectiveness in the field.",
  },
  {
    name: "Mr. Shriram Kulkarni",
    role: "Director – Founder & Managing Director",
    qualification: "ABM & MBA in Agriculture",
    image: "/director3.png",
    experience: "3+",
    experienceLabel: "Years of experience",
    focus: "Product Development",
    focusLabel: "Business strategy",
    description: "Mr. Shriram Kulkarni combines agri-business expertise with strategic business leadership to drive innovation and sustainable growth. His work helps build a trusted agricultural enterprise focused on quality products, regulatory excellence, farmer welfare, and long-term value for farming communities.",
  },
];

const companyStats = [
  ["5,000+", "Farmers connected"],
  ["50+", "Products developed"],
  ["10+", "Districts covered"],
  ["98%", "Farmer satisfaction"],
];

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

export default function LeadershipPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fdf9] text-slate-700">
      <header className="relative isolate overflow-hidden bg-[#14532d] px-6 py-5 text-white shadow-lg">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#facc15]/15 blur-3xl" />
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="/" className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 font-semibold transition hover:-translate-x-1 hover:bg-white hover:text-[#14532d]"><FaArrowLeft /> Back to Home</a>
          <img src="/logo.png" alt="Reliaf Agrotech" className="h-12 rounded-lg bg-white/95 p-1.5 md:h-16" />
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#14532d] via-[#15803d] to-green-600 px-6 py-24 text-white md:py-32">
        <div className="absolute -left-24 top-1/2 h-72 w-72 rounded-full border border-white/15 bg-white/5" />
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }} className="relative mx-auto max-w-4xl text-center">
          <motion.p variants={fadeUp} className="font-bold tracking-[0.22em] text-[#facc15]">THE PEOPLE BEHIND RELIAF</motion.p>
          <motion.h1 variants={fadeUp} className="mt-5 text-4xl font-black leading-tight md:text-6xl">Leadership built on <span className="text-green-200">agricultural insight.</span></motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-green-50 md:text-xl">Meet the experienced team guiding Reliaf Agrotech’s work in sustainable farming, research, production, and farmer success.</motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap justify-center gap-3"><span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold"><FaLeaf className="mr-2 inline text-[#facc15]" />Sustainable farming</span><span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold"><FaLightbulb className="mr-2 inline text-[#facc15]" />Practical innovation</span></motion.div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-6xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} transition={{ staggerChildren: 0.08 }} className="grid grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-xl shadow-green-950/10 md:grid-cols-4">
          {companyStats.map(([value, label]) => <motion.div variants={fadeUp} key={label} className="border-b border-r border-green-100 p-6 text-center last:border-r-0 md:border-b-0"><p className="text-3xl font-black text-[#15803d]">{value}</p><p className="mt-1 text-sm font-medium text-slate-500">{label}</p></motion.div>)}
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ staggerChildren: 0.12 }} className="mx-auto max-w-4xl text-center">
          <motion.p variants={fadeUp} className="font-bold tracking-[0.2em] text-[#15803d]">OUR VISION</motion.p>
          <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-black text-slate-800 md:text-5xl">Empowering farmers with confidence.</motion.h2>
          <motion.p variants={fadeUp} className="mt-6 rounded-3xl border border-green-100 bg-white p-7 text-lg leading-relaxed shadow-lg shadow-green-950/5">To become India’s most trusted agricultural solutions company by empowering farmers through innovative, sustainable, and science-based agricultural technologies.</motion.p>
        </motion.div>

        <div className="mt-20 space-y-12">
          {leaders.map((leader, index) => <motion.article key={leader.name} initial={{ opacity: 0, x: index % 2 === 0 ? -120 : 120, y: 18 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ type: "spring", stiffness: 85, damping: 18, delay: index * 0.08 }} className="group grid overflow-hidden rounded-[2rem] border border-green-100 bg-white shadow-xl shadow-green-950/5 md:grid-cols-2">
            <div className={`relative min-h-[330px] overflow-hidden bg-gradient-to-br from-green-100 to-green-50 p-7 ${index % 2 ? "md:order-2" : ""}`}>
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#facc15]/25" />
              <img src={leader.image} alt={leader.name} className="relative h-full w-full rounded-2xl object-cover shadow-2xl transition duration-700 group-hover:scale-[1.03]" />
            </div>
            <div className={`flex flex-col justify-center p-8 md:p-12 ${index % 2 ? "md:order-1" : ""}`}>
              <p className="font-bold tracking-widest text-[#15803d]">LEADERSHIP</p>
              <h3 className="mt-3 text-3xl font-black text-slate-800 md:text-4xl">{leader.name}</h3>
              <p className="mt-3 text-lg font-bold text-[#15803d]">{leader.role}</p>
              {leader.qualification && <p className="mt-1 font-medium text-slate-500">{leader.qualification}</p>}
              <p className="mt-6 leading-8 text-slate-600">{leader.description}</p>
              <div className="mt-8 grid grid-cols-2 gap-4"><div className="rounded-2xl bg-[#dcfce7] p-4"><p className="text-2xl font-black text-[#15803d]">{leader.experience}</p><p className="text-sm font-medium text-slate-600">{leader.experienceLabel}</p></div><div className="rounded-2xl bg-slate-50 p-4"><p className="font-bold text-[#15803d]">{leader.focus}</p><p className="mt-1 text-sm font-medium text-slate-600">{leader.focusLabel}</p></div></div>
            </div>
          </motion.article>)}
        </div>
      </section>

      <section className="bg-[#14532d] px-6 py-20 text-white"><motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ staggerChildren: 0.1 }} className="mx-auto max-w-4xl text-center"><motion.p variants={fadeUp} className="font-bold tracking-[0.2em] text-[#facc15]">LET’S GROW TOGETHER</motion.p><motion.h2 variants={fadeUp} className="mt-3 text-3xl font-black md:text-5xl">Connect with our leadership team.</motion.h2><motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-green-100">We are committed to supporting farmers, distributors, and partners across Maharashtra.</motion.p><motion.a variants={fadeUp} href="/#contact" className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#facc15] px-7 py-4 font-bold text-[#14532d] transition hover:scale-105">Contact us <FaArrowRight /></motion.a></motion.div></section>

      <footer className="bg-slate-950 px-6 py-10 text-center text-slate-300"><p className="text-lg font-bold text-white">Reliaf Agrotech Pvt Ltd</p><p className="mt-2">Empowering Farmers Through Innovation</p><div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm"><span><FaLocationDot className="mr-2 inline text-[#facc15]" />Maharashtra, India</span><a href="tel:+918793701270"><FaPhone className="mr-2 inline text-[#facc15]" />8793701270</a><a href="tel:+917774893247"><FaPhone className="mr-2 inline text-[#facc15]" />7774893247</a><a href="tel:+919075330820"><FaPhone className="mr-2 inline text-[#facc15]" />9075330820</a></div></footer>
    </main>
  );
}
