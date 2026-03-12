"use client";
import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Prix } from "../components/Prix";
import { Processus } from "../components/Processus";
import { Realisations } from "../components/Realisations";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <Prix />
      <Processus />
      <Realisations />
      <Contact />
      <Footer />
    </>
  );
}
