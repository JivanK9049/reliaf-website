import React, { useState, useEffect } from "react";
import LeadershipPage from "./LeadershipPage";

import PrivacyPolicy from "./PrivacyPolicy";

export default function ReliafAgrotechWebsite() {
const [cart, setCart] = useState([]);
const [showAllProducts, setShowAllProducts] = useState(false);
const [name,setName] = useState("");
const [mobile,setMobile] = useState("");
const [village,setVillage] = useState("");
const [requirement,setRequirement] = useState("");
const [loading, setLoading] = useState(false);
const [showMobileMenu, setShowMobileMenu] = useState(false);
const [qualityOpen, setQualityOpen] = useState(false);
const [currentImage, setCurrentImage] = useState(0);
const heroImages = [
  "/hero1.png",
  "/hero2.png",
  "/hero3.png",
  "/hero4.png",
  "/hero5.png",
];

const [lang,setLang]=useState("en");

useEffect(() => {
  document.title =
    "Reliaf Agrotech Pvt Ltd | Bio Fertilizers & Agricultural Solutions";
}, []);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentImage((prev) =>
      (prev + 1) % heroImages.length
    );
  }, 5000);

  return () => clearInterval(interval);
}, [heroImages.length]);
const translations = {

en:{
title:"Reliaf Agrotech Pvt Ltd",
subtitle:"Trusted by Farmers",
desc:"Empowering Farmers with Modern Agricultural Solutions for Better Growth and Higher Productivity.",

explore:"Explore Products",
contact:"Contact Us",
about:"About Us",

order:"Place Order",
name:"Farmer Name",
mobile:"Mobile Number",
village:"Village / City",
product:"Product Name",
message:"Additional Requirement",
submit:"Submit Order"
},

mr:{
title:"रेलियाफ अ‍ॅग्रोटेक प्रायव्हेट लिमिटेड",

subtitle:"शेतकऱ्यांचा विश्वास, गुणवत्तेची हमी",

desc:"आधुनिक कृषी तंत्रज्ञान आणि उच्च दर्जाच्या उत्पादनांद्वारे शेतकऱ्यांच्या उत्पादनवाढीसाठी आम्ही कटिबद्ध आहोत.",

explore:"उत्पादने पहा",

contact:"संपर्क साधा",

about:"आमच्याविषयी",

order:"ऑर्डर करा",

name:"शेतकऱ्याचे नाव",

mobile:"मोबाईल क्रमांक",

village:"गाव / शहर",

product:"उत्पादनाचे नाव",

message:"अतिरिक्त माहिती",

submit:"ऑर्डर सबमिट करा"
},

hi:{
title:"रेलियाफ एग्रोटेक प्राइवेट लिमिटेड",

subtitle:"किसानों का विश्वास, गुणवत्ता की पहचान",

desc:"आधुनिक कृषि तकनीक और उच्च गुणवत्ता वाले उत्पादों के माध्यम से किसानों की उत्पादकता बढ़ाने के लिए हम प्रतिबद्ध हैं।",

explore:"उत्पाद देखें",

contact:"संपर्क करें",

about:"हमारे बारे में",

order:"ऑर्डर करें",

name:"किसान का नाम",

mobile:"मोबाइल नंबर",

village:"गांव / शहर",

product:"उत्पाद का नाम",

message:"अतिरिक्त जानकारी",

submit:"ऑर्डर सबमिट करें"
}

};

const t = translations[lang];

const products=[

{
  title: "Root Faster 98%",
  image: "/Root Faster.png",
  desc: "Advanced humic-based formulation for stronger roots, improved nutrient availability, healthier plants and higher yields."
},

{
title:"Reliaf P+",
image:"/p-bacteria.png",
desc:"Improves phosphorus uptake"
},

{
title:"Reliaf K+",
image:"/k-bacteria.png",
desc:"Improves potash uptake"
},

{
title:"Reliaf N+",
image:"/n-bacatria.png",
desc:"Nitrogen fixing bacteria"
},
{
title:"Reliaf Z+",
image:"/z-bacteria.png",
desc:"Improves zinc availability in soil"
},

{
title:"Setting Plus",
image:"/Seting Plus.png",
desc:"Supports flowering and fruit setting"
},

{
title:"Humi boost",
image:"/Humi boots.png",
desc:"Enhances root growth and nutrient absorption"
},

{
title:"All In One",
image:"/all-in-one.png",
desc:"Complete nutrition for crops"
},
{
title:"Corn Special",
image:"/corn-special.png",
desc:"Special nutrient formula for corn crop growth, strong roots and higher yield."
},

{
title:"Tur Udid Special",
image:"/tur-udid-special.png",
desc:"Improves flowering, pod formation and productivity in Tur and Udid crops."
},

{
title:"Cotton Special",
image:"/cotton-special.png",
desc:"Supports boll development, flowering and healthy cotton growth."
},

{
title:"Fast Spreader",
image:"/fast-spreader.png",
desc:"Improves spray spreading and absorption on crop leaves."
},

{
title:"Soya Special",
image:"/soya-special.png",
desc:"Balanced nutrition for soybean crop growth and better production."
},
{
title:"RE TRICO",
image:"/retrico.png",
desc:"Nature's micro power for healthy crops, stronger roots and higher yields."
},

{
title:"RE BACILA",
image:"/rebacila.png",
desc:"Beneficial Bacillus formulation for soil health, disease protection and better productivity."
},

{
title:"RE PAECILO",
image:"/repaecilo.png",
desc:"Powerful bio-formulation for nematode management, stronger roots and healthy crop growth."
},

{
title:"RE FLOWER",
image:"/reflower.png",
desc:"Promotes flowering, pollination, fruit setting and higher crop yield."
},

{
title:"RHIZO MAX",
image:"/rhizomax.png",
desc:"Advanced root promoter for stronger roots, nutrient uptake and vigorous growth."
},

{
title:"RE SUDO",
image:"/resudo.png",
desc:"Bio-enriched microbial formulation for healthy soil, stronger plants and higher yields."
},

{
title:"GROW MIX FERT",
image:"/growmixfert.png",
desc:"Complete multi-nutrient formula for balanced nutrition, better growth and maximum productivity."
},

];
const visibleProducts =
  showAllProducts
    ? products
    : products.slice(0, 8);
const addToCart = (item) => {

setCart((prevCart) => {

const existing = prevCart.find(
(p) => p.title === item.title
);

if(existing){

return prevCart.map((p)=>

p.title === item.title
? { ...p, qty: p.qty + 1 }
: p

);

}

return [

...prevCart,

{
...item,
qty: 1
}

];

});

};
const handleSubmit = async (e) => {

  e.preventDefault();
  setLoading(true);

  if (cart.length === 0) {
    alert("Please select at least one product");
    setLoading(false);
    return;
  }

  if (name.trim().length < 3) {
    alert("Please enter valid name");
    setLoading(false);
    return;
  }

  if (!/^[0-9]{10}$/.test(mobile)) {
    alert("Please enter valid mobile number");
    setLoading(false);
    return;
  }

  const order = {
    secret: "RELIAF123",
    name,
    mobile,
    village,
    product: cart.map(item =>
      `${item.title} (${item.qty})`
    ).join(", "),
    requirement
  };

  try {

    await fetch(
      "https://script.google.com/macros/s/AKfycbwexT6eHm8_9tsOZ-2b7hH2y8GNNr4d8RxhgzVmfcZ_9-jUbTLhTZ9f2Aby7EAejMxoGA/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      }
    );

    alert("Thank You! Your order has been received successfully. Our team will contact you shortly.");

    window.scrollTo({
    top: 0,
    behavior: "smooth"
    });

    setName("");
    setMobile("");
    setVillage("");
    setRequirement("");
    setCart([]);
    setLoading(false);

  } catch (err) {

    console.error(err);
    setLoading(false);
    alert("Failed to submit order");

  }

};


return(

<div className="min-h-screen bg-green-50">

{/* MODERN STICKY NAVBAR */}

<header className="
sticky
top-0
z-50
backdrop-blur-xl
bg-white/80
shadow-md
border-b
border-green-100
">

<div className="
max-w-7xl
mx-auto
px-4
py-3
flex
items-center
justify-between
">

{/* LEFT */}
<div className="relative flex items-center gap-2 shrink-0">
<button
  onClick={() => setShowMobileMenu(!showMobileMenu)}
  className="md:hidden text-3xl text-green-700 font-bold"
>
  ☰
</button>
<img
  src="/logo.png"
  alt="logo"
  className="
    w-14
    h-14
    rounded-xl
    object-cover
  "
/>

<div className="min-w-max">
<h2 className="font-bold text-xl text-green-800 whitespace-nowrap">
  Reliaf Agrotech
</h2>

  <p className="text-sm text-gray-500 whitespace-nowrap">
    Trusted By Farmers
  </p>
</div>

</div>

{/* CENTER */}

<nav className="
hidden
lg:flex
items-center
gap-5
font-semibold
text-gray-700
flex-1
justify-center
">

<a href="#products" className="hover:text-green-700 transition">
Products
</a>

<a
  href="/leadership"
  className="hover:text-green-700 transition"
>
  Leadership
</a>
<div className="relative group">
  <button className="hover:text-green-600 font-medium">
    Quality ▼
  </button>

  <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
    
    <a
      href="/quality/product-quality"
      className="block px-4 py-3 hover:bg-green-50 border-b"
    >
      Product Quality
    </a>

    <a
      href="/quality/manufacturing"
      className="block px-4 py-3 hover:bg-green-50 border-b"
    >
      Manufacturing Quality Check
    </a>

    <a
      href="/quality/farmer-results"
      className="block px-4 py-3 hover:bg-green-50 border-b"
    >
      Farmer Results
    </a>

    <a
      href="/quality/certifications"
      className="block px-4 py-3 hover:bg-green-50"
    >
      Quality Certifications
    </a>

  </div>
</div>
<a href="/careers" className="hover:text-green-700 transition">
  Careers
</a>
<a href="#contact" className="hover:text-green-700 transition">
Contact
</a>
<a
href="/privacy-policy"
  className="hover:text-green-700 transition"
>
  Privacy Policy
</a>


</nav>

{/* RIGHT */}

<div className="flex items-center gap-3">

<a
href="tel:8793701270"
className="
hidden
md:flex
bg-green-700
text-white
px-5
py-2
rounded-xl
font-semibold
hover:bg-green-800
transition
"
>

Call Now

</a>

<select
value={lang}
onChange={(e)=>setLang(e.target.value)}
className="
bg-green-50
border
border-green-200
rounded-xl
px-3
py-2
outline-none
text-sm
"
>

<option value="en">🇺🇸 EN</option>
<option value="mr">🇮🇳 मराठी</option>
<option value="hi">🇮🇳 हिन्दी</option>

</select>

</div>

</div>

{showMobileMenu && (
  <div className="md:hidden bg-white border-t shadow-lg">

<a
  href="#products"
  onClick={() => setShowMobileMenu(false)}
  className="block p-4 border-b"
>
  Products
</a>

    <a
      href="#results"
      onClick={() => setShowMobileMenu(false)}
      className="block p-4 border-b"
    >
      Results
    </a>

    <a
        href="/leadership"
        onClick={() => setShowMobileMenu(false)}
        className="block p-4 border-b"
      >
        Leadership
    </a>
<div className="border-b">
  <button
    onClick={() => setQualityOpen(!qualityOpen)}
    className="w-full flex justify-between items-center py-4 text-green-600 font-semibold"
  >
    Quality
    <span>{qualityOpen ? "▲" : "▼"}</span>
  </button>

  {qualityOpen && (
    <div className="pl-4 pb-3 bg-gray-50">

      <a
        href="/quality/product-quality"
        className="block py-2 text-gray-700"
      >
        Product Quality
      </a>

      <a
        href="/quality/manufacturing"
        className="block py-2 text-gray-700"
      >
        Manufacturing Process
      </a>

      <a
        href="/quality/farmer-results"
        className="block py-2 text-gray-700"
      >
        Farmer Results
      </a>

      <a
        href="/quality/certifications"
        className="block py-2 text-gray-700"
      >
        Quality Certifications
      </a>


    </div>
  )}
</div>
    <a
      href="/careers"
      onClick={() => setShowMobileMenu(false)}
      className="block p-4 border-b"
    >
      Careers
    </a>

    <a
      href="#contact"
      onClick={() => setShowMobileMenu(false)}
      className="block p-4"
    >
      Contact
    </a>
    <a
      href="/privacy-policy"
      onClick={() => setShowMobileMenu(false)}
      className="block p-4 border-b"
    >
      Privacy Policy
    </a>

  </div>
)}
</header>

{/* HERO */}

<section
  className="
  relative
  min-h-screen
  flex
  items-center
  bg-fixed
  overflow-hidden
  text-white
  px-5
  py-8
  md:py-16
  "
>

<div
  className="absolute inset-0 hero-bg"
  style={{
    backgroundImage: `
      linear-gradient(
        rgba(0,80,30,0.65),
        rgba(0,80,30,0.65)
      ),
      url(${heroImages[currentImage]})
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
></div>

<div className="relative z-10 max-w-7xl mx-auto">



{/* TOP BAR */}

<div className="flex items-start md:items-center justify-between gap-4 flex-wrap">

{/* LOGO + TITLE */}

<div className="hidden md:flex items-center gap-4">

<div className="bg-white p-2 rounded-2xl shadow-2xl flex items-center justify-center w-20 h-20 md:w-28 md:h-28 shrink-0">

<img
src="/logo.png"
alt="Reliaf Logo"
className="w-full h-full object-contain"
/>

</div>

<div>

<h2 className="text-2xl md:text-4xl font-bold leading-tight">
{t.title}
</h2>

<p className="text-sm md:text-lg opacity-90 mt-1">
{t.subtitle}
</p>

</div>

</div>



</div>

{/* HERO CONTENT */}

<div className="max-w-4xl mx-auto text-center mt-12">

{/* LEFT SIDE */}

<div>

<h1
  className="
  text-5xl
  md:text-7xl
  font-extrabold
  leading-tight
  text-center
  text-white
  drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]
  "
>
  Reliaf Agrotech

  <span className="block text-green-200">
    Pvt Ltd
  </span>
</h1>

<p
  className="
  text-lg
  md:text-2xl
  mt-6
  leading-relaxed
  text-center
  text-white
  max-w-3xl
  mx-auto
  drop-shadow-lg
  "
>

{t.desc}

</p>

<div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">

  <a
    href="#products"
    className="
    bg-white
    text-green-700
    px-8
    py-4
    rounded-2xl
    font-bold
    shadow-xl
    hover:scale-105
    hover:shadow-2xl
    transition
    text-center
    "
  >
    {t.explore}
  </a>

  <a
    href="#contact"
    className="
    border-2
    border-white
    px-8
    py-4
    rounded-2xl
    font-bold
    hover:bg-white
    hover:text-green-700
    transition
    text-center
    "
  >
    {t.contact}
  </a>

  <a
    href="/leadership"
    className="
    bg-green-900
    text-white
    px-8
    py-4
    rounded-2xl
    font-bold
    hover:scale-105
    transition
    text-center
    "
  >
  <a
  href="/quality-policy"
  className="hover:text-green-700 transition"
> 
<a
href="/privacy-policy"
  className="hover:text-green-700 transition"
></a>
</a>

    Meet Our Leadership Team
  </a>

</div>
</div> 
{/* RIGHT SIDE IMAGE */}



</div>

</div>

</section>


{/* PRODUCTS */}

<section id="products" className="py-20 px-6 bg-white">

<h2 className="text-center text-3xl md:text-5xl text-green-700 font-bold mb-12">
Products
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

{visibleProducts.map((item,index)=>(

<div
key={index}
className="
group
bg-white
rounded-[30px]
overflow-hidden
shadow-lg
hover:shadow-2xl
hover:-translate-y-2
transition-all
duration-500
"
>

{/* PRODUCT IMAGE */}

<div className="
bg-gradient-to-b
from-green-50
to-white
p-4
flex
justify-center
items-center
h-[250px] md:h-[380px]
">

<img
  src={item.image}
  alt={item.title}
  className="
  max-h-full
  max-w-full
  object-contain
  rounded-xl
  "
/>

</div>

{/* PRODUCT CONTENT */}

<div className="p-5 flex flex-col flex-1">

<h3 className="
text-2xl
font-bold
text-green-800
text-center
leading-tight
min-h-[70px]
flex
items-center
justify-center
">
{item.title}
</h3>

<p className="
text-gray-600
text-center
mt-3
leading-relaxed
flex-1
">
{item.desc}
</p>

{/* BUTTONS */}

<div className="flex gap-3 mt-6">

{cart.find((p)=>p.title===item.title) ? (

<div className="
flex
items-center
justify-between
flex-1
bg-green-600
text-white
rounded-xl
overflow-hidden
shadow-lg
">

<button
onClick={() =>

setCart((prev)=>

prev
.map((p)=>

p.title===item.title
? {...p, qty:p.qty-1}
: p

)
.filter((p)=>p.qty > 0)

)

}
className="
px-4
py-3
text-2xl
font-bold
"
>

-

</button>

<span className="
font-bold
text-lg
px-3
">

{
cart.find((p)=>p.title===item.title)?.qty
}

</span>

<button
onClick={() =>

setCart((prev)=>

prev.map((p)=>

p.title===item.title
? {...p, qty:p.qty+1}
: p

)

)

}
className="
px-4
py-3
text-2xl
font-bold
"
>

+

</button>

</div>

) : (

<button
onClick={() => addToCart(item)}
className="
flex-1
bg-white
border-2
border-green-600
text-green-600
font-bold
py-3
rounded-xl
hover:bg-green-600
hover:text-white
transition
"
>

🛒 Add To Cart

</button>

)}

<a
href="https://wa.me/918793701270"
target="_blank"
rel="noreferrer"
className="
px-5
border-2
border-green-700
text-green-700
text-center
py-3
rounded-xl
font-semibold
hover:bg-green-700
hover:text-white
transition-all
duration-300
"
>

Inquiry

</a>

</div>

</div>

</div>

))}
</div>

<div className="text-center mt-10">
  <button
    onClick={() => setShowAllProducts(!showAllProducts)}
    className="
      bg-green-700
      text-white
      px-6
      py-3
      rounded-xl
      font-semibold
    "
  >
    {showAllProducts
      ? "Show Less Products"
      : "View All Products"}
  </button>
</div>

</section>



{/* CONTACT */}

<section id="contact" className="py-20 px-6">

<div className="
max-w-7xl
mx-auto
grid
grid-cols-1
lg:grid-cols-2
gap-6
items-start
">

<div className="
bg-white
p-6
md:p-8
rounded-3xl
shadow-xl
w-full
h-full
flex
flex-col
">

<h2 className="
text-3xl
font-bold
text-green-700
mb-10
text-center
">
📍 Office Addresses
</h2>

<div className="space-y-8">

{/* Pune Office */}

<div className="
bg-green-50
rounded-2xl
p-5
text-center
">

<h3 className="
text-2xl
font-bold
text-gray-800
mb-4
">
Pune Office
</h3>

<p className="
text-gray-700
leading-8
text-base
sm:text-lg
break-words
">

Mantra City 360, Flat No A803
<br/>

Survey No 389/1A
<br/>

Village Talegaon Dabhade
<br/>

Tal Maval Dist Pune
<br/>

410506

</p>

</div>

{/* Solapur Office */}

<div className="
bg-green-50
rounded-2xl
p-5
text-center
">

<h3 className="
text-2xl
font-bold
text-gray-800
mb-4
">
Solapur Office
</h3>

<p className="
text-gray-700
leading-8
text-base
sm:text-lg
break-words
">

At Post Lahu
<br/>

Tal Madha Dist Solapur
<br/>

413208

</p>

</div>

{/* Akulgaon Office */}

<div className="
bg-green-50
rounded-2xl
p-5
text-center
">

<h3 className="
text-2xl
font-bold
text-gray-800
mb-4
">
Akulgaon Office
</h3>

<p className="
text-gray-700
leading-8
text-base
sm:text-lg
break-words
">

House No 384
<br/>

Near Mandir Akulgaon
<br/>

Tal Madha Dist Solapur
<br/>

413208

</p>

</div>

</div>

</div>

{/* CONTACT SECTION */}

<div className="
flex
flex-col
gap-6
">

{/* CONTACT CARD */}

<div className="
bg-white
p-6
md:p-8
rounded-3xl
shadow-xl
w-full
">

<h2 className="
text-3xl
font-bold
text-green-700
mb-8
text-center
">
📞 Contact
</h2>

<div className="space-y-6">

<div className="text-center">

<p className="
text-sm
font-semibold
text-gray-500
uppercase
tracking-wide
mb-2
">
Mobile Number
</p>

<div className="
text-xl
font-semibold
text-gray-800
">
  <a href="tel:+918793701270">+91 8793701270</a><br />
  <a href="tel:+917774893247">+91 7774893247</a><br />
  <a href="tel:+919075330820">+91 9075330820</a>
</div>

</div>

<div className="text-center">

<p className="
text-sm
font-semibold
text-gray-500
uppercase
tracking-wide
mb-2
">
Email Address
</p>

<a
href="mailto:reliafagrotech@gmail.com"
className="text-lg font-semibold text-gray-800"
>
reliafagrotech@gmail.com
</a>

</div>

</div>

</div>

{/* WHATSAPP CARD */}

<div className="
bg-white
p-6
rounded-3xl
shadow-xl
">

<a
href="https://wa.me/918793701270"
target="_blank"
rel="noreferrer"
className="
bg-green-600
text-white
py-4
rounded-2xl
font-bold
text-center
w-full
block
hover:bg-green-700
transition
shadow-lg
"
>

💬 WhatsApp Support

</a>

</div>
<div className="
bg-white
p-6
rounded-3xl
shadow-xl
">

<div className="
text-center
text-sm
font-semibold
text-gray-500
uppercase
tracking-wide
mb-5
">

Follow Us

</div>

<div className="
mt-6
border-t
border-gray-200
pt-6
"></div>

<div className="
flex
justify-center
gap-4
flex-wrap
">

<a
href="https://instagram.com/reliaf_agro_tech"
target="_blank"
rel="noreferrer"
className="
bg-gradient-to-r
from-pink-500
to-purple-500
text-white
px-5
py-3
rounded-xl
font-semibold
shadow-md
hover:scale-105
hover:shadow-2xl
transition
"
>
📸 Instagram
</a>

<a
href="https://www.youtube.com/@ReliafAgroTechPvtLtd"
target="_blank"
rel="noreferrer"
className="
bg-red-600
text-white
px-5
py-3
rounded-xl
font-semibold
shadow-md
hover:scale-105
hover:shadow-2xl
transition
"
>
▶️ YouTube
</a>


</div>

</div>

</div>
</div>

{/* CART SECTION */}

{cart.length > 0 && (

<section className="py-10 px-6 bg-white">

<div className="max-w-5xl mx-auto">

<h2 className="
text-3xl
font-bold
text-green-700
mb-6
text-center
">

🛒 Selected Products

</h2>

<div className="space-y-4">

{cart.map((item,index)=>(

<div
key={index}
className="
flex
flex-col
md:flex-row
justify-between
md:items-center
gap-4
bg-green-50
p-5
rounded-2xl
shadow
"
>

<div>

<h3 className="font-bold text-lg">
{item.title}
</h3>

<p className="text-gray-600">
Quantity: {item.qty}
</p>

</div>

<div className="
flex
items-center
gap-2
flex-wrap
">

<button
onClick={() =>

setCart((prev)=>

prev.map((p)=>

p.title===item.title
? {...p, qty:p.qty+1}
: p

)

)

}
className="
bg-green-700
text-white
px-4
py-2
rounded-lg
"
>
+
</button>

<button
onClick={() =>

setCart((prev)=>

prev
.map((p)=>

p.title===item.title
? {...p, qty:p.qty-1}
: p

)
.filter((p)=>p.qty > 0)

)

}
className="
bg-yellow-500
text-white
px-4
py-2
rounded-lg
"
>
-
</button>

<button
onClick={() =>
setCart((prev)=>
prev.filter((_,i)=>i!==index)
)
}
className="
bg-red-500
text-white
px-4
py-2
rounded-lg
"
>
Remove
</button>

</div>

</div>

))}

</div>

</div>

</section>

)}
</section>

{/* ORDER FORM */}

<section
id="order"
className="py-20 px-6 bg-green-50"
>

<div className="max-w-5xl mx-auto">

<div className="text-center mb-10">

<h2 className="text-3xl md:text-5xl font-bold text-green-700">

🛒 {t.order}

</h2>

<p className="text-gray-600 mt-4">

{lang==="en" &&
"Fill details to place order"}

{lang==="mr" &&
"ऑर्डर करण्यासाठी माहिती भरा"}

{lang==="hi" &&
"ऑर्डर करने के लिए जानकारी भरें"}

</p>

</div>



<div className="bg-white p-10 rounded-3xl shadow-xl">

<form
onSubmit={handleSubmit}
className="grid grid-cols-1 md:grid-cols-2 gap-6"
>

<input
type="text"
required
minLength={3}
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder={t.name}
className="border p-4 rounded-xl"
/>


<input
type="tel"
required
pattern="[0-9]{10}"
maxLength={10}
value={mobile}
onChange={(e)=>
  setMobile(
    e.target.value.replace(/\D/g,"")
  )
}
placeholder={t.mobile}
className="border p-4 rounded-xl"
/>


<input
type="text"
required
value={village}
onChange={(e)=>setVillage(e.target.value)}
placeholder={t.village}
className="border p-4 rounded-xl"
/>


<div className="
border
p-4
rounded-xl
bg-green-50
">



<p className="font-semibold text-green-700 mb-2">
Selected Products
</p>

{cart.length===0 ? (

<p className="text-gray-500">
No product selected
</p>

):(

cart.map((item,index)=>(

<p key={index}>
{item.title} × {item.qty}
</p>

))

)}

</div>



<textarea
value={requirement}
onChange={(e)=>setRequirement(e.target.value)}
placeholder={t.message}
rows="5"
className="border p-4 rounded-xl md:col-span-2"
/>


<button
type="submit"
disabled={loading}
className={`
bg-gradient-to-r
from-green-600
to-green-800
text-white
py-4
rounded-xl
md:col-span-2
font-bold
text-lg
transition
${loading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
`}
>

{loading ? "Submitting..." : t.submit}

</button>

</form>

</div>

</div>

</section>
{/* MOBILE STICKY BUTTONS */}
{cart.length > 0 && (
  <a
    href="#order"
    className="
    fixed
    bottom-24
    right-5
    bg-green-700
    text-white
    px-5
    py-3
    rounded-full
    shadow-2xl
    z-50
    font-bold
    hover:bg-green-800
    hover:scale-105
    transition-all
    duration-300
    "
  >
    🛒 Order ({cart.reduce((total, item) => total + item.qty, 0)})
  </a>
)}
<div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl p-3 flex justify-around md:hidden z-50">

<a
href="tel:8793701270"
className="bg-green-600 text-white px-4 py-3 rounded-xl text-sm font-bold"
>
📞 Call
</a>

<a
href="https://wa.me/918793701270"
target="_blank"
rel="noreferrer"
className="bg-green-500 text-white px-4 py-3 rounded-xl text-sm font-bold"
>
💬 WhatsApp
</a>

<a
href="#products"
className="bg-black text-white px-4 py-3 rounded-xl text-sm font-bold"
>
🛒 Products
</a>

</div>

<footer className="bg-gray-900 text-white py-8 text-center">

<div className="max-w-5xl mx-auto px-4">

<p className="font-bold text-lg">
Reliaf Agrotech Pvt Ltd
</p>

<div className="mt-4 text-sm text-gray-300 space-y-1">

<p>GSTIN: 27AAOCR6086N1ZE</p>

<p>Bio-Fertilizer License: LCFWD2025120498</p>

<p>Bio-Stimulant License: LCBWD1220250148</p>

<p>CIN: U20210PN2025PTC241544</p>

</div>

<p className="mt-6 text-gray-400">
© {new Date().getFullYear()} Reliaf Agrotech Pvt Ltd. All Rights Reserved.
</p>

</div>

</footer>

</div>

);

}