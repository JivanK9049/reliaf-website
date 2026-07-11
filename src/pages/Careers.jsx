import { Helmet } from "react-helmet-async";
import CareerHero from "../components/CareerHero";
import WhyJoin from "../components/WhyJoin";
import Stats from "../components/Stats";
import OpenPositions from "../components/OpenPositions";
import HiringProcess from "../components/HiringProcess";
import CareerForm from "../components/CareerForm";
import FAQ from "../components/FAQ";
import ContactHR from "../components/ContactHR";
import CareerCTA from "../components/CareerCTA";

export default function Careers() {
  return <main className="min-h-screen bg-white text-[#475569]"><Helmet><title>Careers | Reliaf Agrotech Pvt Ltd</title><meta name="description" content="Explore career opportunities at Reliaf Agrotech Pvt Ltd. Join our growing team in sales, marketing, agriculture, production, and more." /><meta name="keywords" content="Reliaf Careers, Agriculture Jobs, Sales Officer Jobs, Agri Jobs Maharashtra" /></Helmet><CareerHero /><WhyJoin /><Stats /><OpenPositions /><HiringProcess /><CareerForm /><FAQ /><ContactHR /><CareerCTA /></main>;
}
