import { Helmet } from "react-helmet-async";
import { FaArrowLeft, FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { products } from "../data/products";

const siteUrl = "https://reliafagrotech.com";

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  if (!product) return <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-center"><div><h1 className="text-3xl font-black text-slate-800">Product not found</h1><a href="/#products" className="mt-5 inline-flex rounded-xl bg-green-700 px-5 py-3 font-bold text-white">Browse products</a></div></main>;

  const productUrl = `${siteUrl}/products/${product.slug}`;
  const structuredData = { "@context": "https://schema.org", "@type": "Product", name: product.title, description: product.desc, image: `${siteUrl}${product.image}`, url: productUrl, brand: { "@type": "Brand", name: "Reliaf Agrotech" }, category: "Agricultural crop nutrition and bio-fertilizer" };

  return <main className="min-h-screen bg-[#f8fdf9]"><Helmet><title>{`${product.title} | Reliaf Agrotech`}</title><meta name="description" content={`${product.desc} Learn about ${product.title} from Reliaf Agrotech.`} /><link rel="canonical" href={productUrl} /><meta property="og:title" content={`${product.title} | Reliaf Agrotech`} /><meta property="og:description" content={product.desc} /><meta property="og:image" content={`${siteUrl}${product.image}`} /><script type="application/ld+json">{JSON.stringify(structuredData)}</script></Helmet><section className="bg-gradient-to-br from-[#14532d] to-[#15803d] px-4 py-12 text-white sm:px-6 sm:py-16"><div className="mx-auto max-w-6xl"><a href="/#products" className="button-lift inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 font-bold backdrop-blur-sm hover:bg-white hover:text-[#14532d]"><FaArrowLeft /> All products</a><div className="mt-10 max-w-3xl"><p className="font-bold tracking-[0.2em] text-[#facc15]">RELIAF AGRICULTURAL SOLUTIONS</p><h1 className="mt-3 text-4xl font-black sm:text-6xl">{product.title}</h1><p className="mt-5 text-lg leading-8 text-green-50">{product.desc}</p></div></div></section><section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 sm:py-16 md:grid-cols-2 md:items-center"><div className="rounded-3xl bg-white p-5 shadow-xl shadow-green-950/10"><img src={product.image} alt={product.title} className="h-auto w-full rounded-2xl object-contain" /></div><div><p className="font-bold tracking-[0.2em] text-[#15803d]">PRODUCT OVERVIEW</p><h2 className="mt-3 text-3xl font-black text-slate-800">Made for practical farm results</h2><p className="mt-5 leading-8 text-slate-600">{product.desc} Our team can help you choose the right Reliaf solution for your crop and growing conditions.</p><ul className="mt-6 space-y-3 text-slate-700"><li className="flex gap-3"><FaCheckCircle className="mt-1 shrink-0 text-[#15803d]" /> Product guidance from our team</li><li className="flex gap-3"><FaCheckCircle className="mt-1 shrink-0 text-[#15803d]" /> Order support by phone or WhatsApp</li></ul><a href="https://wa.me/918793701270" target="_blank" rel="noreferrer" className="button-lift mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl bg-[#15803d] px-6 font-bold text-white"><FaWhatsapp /> Ask about {product.title}</a></div></section></main>;
}
