import { FaChartLine, FaGraduationCap, FaHandshake, FaMoneyBillWave, FaSeedling, FaTrophy } from "react-icons/fa";

const benefits = [
  [FaChartLine, "Career Growth", "Clear opportunities to grow with an ambitious team."],
  [FaMoneyBillWave, "Attractive Salary", "Competitive pay that recognises your contribution."],
  [FaTrophy, "Monthly Incentives", "Performance rewards that celebrate great work."],
  [FaGraduationCap, "Professional Training", "Learn from product, sales, and agriculture experts."],
  [FaSeedling, "Agriculture Innovation", "Help create a more productive, sustainable future."],
  [FaHandshake, "Friendly Environment", "A respectful workplace built on teamwork and trust."],
];

export default function WhyJoin() {
  return <section id="why-join" className="bg-[#dcfce7]/50 px-6 py-24"><div className="mx-auto max-w-7xl"><div className="mx-auto max-w-2xl text-center" data-aos="fade-up"><p className="font-bold tracking-widest text-[#15803d]">WHY RELIAF</p><h2 className="mt-3 text-4xl font-black text-slate-800">A workplace where people and ideas <span className="gradient-text">grow.</span></h2></div><div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{benefits.map(([Icon, title, text], index) => <article key={title} data-aos="fade-up" data-aos-delay={index * 70} className="glass-card hover-lift rounded-3xl p-7 shadow-sm"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#15803d] to-green-400 text-2xl text-white"><Icon /></div><h3 className="mt-6 text-xl font-bold text-slate-800">{title}</h3><p className="mt-2 leading-relaxed text-slate-600">{text}</p></article>)}</div></div></section>;
}
