import { FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function CareerHero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-[#14532d] text-white">
      <img src="/career-banner.jpg" alt="Reliaf Agrotech team and farming innovation" className="career-hero-image absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#092d1a]/95 via-[#14532d]/80 to-[#14532d]/45" />
      <div className="career-shape absolute -right-10 top-24 h-48 w-48 rounded-full border border-white/20 bg-[#facc15]/20" />
      <div className="career-shape absolute bottom-20 left-8 h-24 w-24 rounded-3xl bg-green-300/15" style={{ animationDelay: "-2s" }} />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-28 lg:px-8">
        <a href="/" className="button-lift inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm hover:bg-white hover:text-[#14532d]">
          <FaArrowLeft /> Back to Home
        </a>
        <div className="career-hero-content max-w-3xl" data-aos="fade-up">
          <p className="mb-5 text-sm font-bold tracking-[0.25em] text-[#facc15]">JOIN OUR TEAM</p>
          <h1 className="text-5xl font-black leading-tight md:text-7xl">Grow Your Career<br />With <span className="text-green-200">Reliaf Agrotech</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-green-50 md:text-xl">Build a meaningful career helping Indian agriculture thrive through practical innovation, trusted products, and strong relationships.</p>
          <a href="#apply" className="shimmer-button button-lift mt-9 inline-flex items-center gap-3 rounded-xl bg-[#facc15] px-7 py-4 font-bold text-[#14532d] shadow-lg hover:bg-yellow-300">Explore opportunities <FaArrowRight /></a>
        </div>
      </div>
      <a href="#why-join" aria-label="Scroll to why join" className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold tracking-widest text-white/80"><span>SCROLL TO EXPLORE</span><FaArrowDown className="animate-bounce" /></a>
    </section>
  );
}
