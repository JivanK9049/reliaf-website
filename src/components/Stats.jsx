import CountUpPackage from "react-countup";

// Vite may expose this CommonJS package as either the component itself or a
// module object depending on whether it is pre-bundled. Support both forms.
const CountUp = CountUpPackage.default || CountUpPackage;

const stats = [[100, "+", "Dealers"], [50, "+", "Products"], [5000, "+", "Happy Farmers"]];
export default function Stats() { return <section className="bg-[#14532d] px-6 py-16 text-white"><div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 text-center sm:grid-cols-3">{stats.map(([end, suffix, label], i) => <div key={label} data-aos="zoom-in" data-aos-delay={i * 90}><p className="text-4xl font-black text-[#facc15] md:text-5xl"><CountUp end={end} duration={3} separator="," />{suffix}</p><p className="mt-2 font-medium text-green-100">{label}</p></div>)}</div></section>; }
