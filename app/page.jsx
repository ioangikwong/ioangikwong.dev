"use client";
import { useState } from "react";
import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Prix } from "../components/Prix";
import { Processus } from "../components/Processus";
import { Realisations } from "../components/Realisations";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";
import { PopupMaquette } from "../components/PopupMaquette";

export default function Home() {
  const [popupTrigger, setPopupTrigger] = useState(0);
  return (
    <>
      <Nav onOpenPopup={() => setPopupTrigger((n) => n + 1)} />
      <Hero />
      <Services />
      <Prix />
      <Processus />
      <Realisations />
      <Contact />
      <Footer />
      <PopupMaquette externalOpen={popupTrigger} />
    </>
  );
}
