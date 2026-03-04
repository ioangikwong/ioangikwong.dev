"use client";
import { useState, useEffect } from "react";
import { theme } from "./theme";
import { TextField } from "./TextField";
import { Button } from "./Button";

export function PopupMaquette({ externalOpen }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrollTriggered, setScrollTriggered] = useState(false);
  const [form, setForm] = useState({ nom: "", courriel: "", domaine: "" });
  const [status, setStatus] = useState("idle");

  const openPopup = () => {
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };

  useEffect(() => {
    const section = document.getElementById("processus");
    if (!section) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !scrollTriggered) {
          setScrollTriggered(true);
          openPopup();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, [scrollTriggered]);

  useEffect(() => {
    if (externalOpen) openPopup();
  }, [externalOpen]);

  const close = () => {
    setVisible(false);
    setTimeout(() => setMounted(false), 400);
    sessionStorage.setItem("popup_dismissed", "1");
  };

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: form.nom,
          courriel: form.courriel,
          message: `Demande de maquette gratuite\nDomaine à refaire: ${form.domaine}`,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Popup form error:", res.status, data);
        throw new Error(data.error || res.statusText);
      }
      setStatus("sent");
    } catch (err) {
      console.error("Popup form error:", err);
      setStatus("error");
    }
  };

  if (!mounted) return null;

  return (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: visible ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(12px)" : "blur(0px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        opacity: visible ? 1 : 0,
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          transform: visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(20px)",
          opacity: visible ? 1 : 0,
          transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          position: "relative",
          width: "100%",
          maxWidth: 560,
          background: theme.palette.white,
          backgroundImage: "url(/footer-gradient.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          border: `1px solid ${theme.palette.grey[100]}`,
          borderRadius: theme.radii.xl,
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ padding: "40px 36px", position: "relative" }}>
          <button
            onClick={close}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: theme.palette.grey[500],
              padding: 4,
              display: "flex",
              transition: theme.transition.default,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = theme.palette.black)}
            onMouseLeave={(e) => (e.currentTarget.style.color = theme.palette.grey[500])}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {status === "sent" ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
              <p
                style={{
                  fontFamily: theme.fonts.display,
                  fontSize: 20,
                  fontWeight: 700,
                  color: theme.palette.black,
                  marginBottom: 8,
                }}
              >
                Demande envoyée!
              </p>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 15,
                  color: theme.palette.grey[500],
                  lineHeight: 1.6,
                }}
              >
                Je vous envoie votre maquette et devis dans les prochaines 48h.
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 28 }}>
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: 13,
                    fontWeight: 600,
                    color: theme.palette.grey[500],
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  Offre gratuite
                </p>
                <h2
                  style={{
                    fontFamily: theme.fonts.display,
                    fontSize: "clamp(20px, 2.5vw, 24px)",
                    fontWeight: 800,
                    color: theme.palette.black,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.25,
                    marginBottom: 10,
                  }}
                >
                  Recevez une maquette de votre page d&apos;accueil
                </h2>
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: 15,
                    color: theme.palette.grey[500],
                    lineHeight: 1.6,
                  }}
                >
                  Maquette gratuite + devis pour la refonte complète. Sans engagement.
                </p>
              </div>

              <form
                className="popup-form"
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <TextField variant="bright" label="Nom" name="nom" value={form.nom} onChange={handleChange} inputStyle={{ background: "rgba(255,255,255,0.18)", borderColor: "rgba(250,250,250,0.4)", color: "#fff" }} />
                <TextField variant="bright" label="Courriel" name="courriel" value={form.courriel} onChange={handleChange} inputStyle={{ background: "rgba(255,255,255,0.18)", borderColor: "rgba(250,250,250,0.4)", color: "#fff" }} />
                <TextField variant="bright" label="URL du site à refaire" name="domaine" placeholder="ex: monsiteweb.com" value={form.domaine} onChange={handleChange} inputStyle={{ background: "rgba(255,255,255,0.18)", borderColor: "rgba(250,250,250,0.4)", color: "#fff" }} />
                {status === "error" && (
                  <p style={{ fontFamily: theme.fonts.body, fontSize: 14, color: "#ef4444", margin: 0 }}>
                    Une erreur est survenue. Réessayez.
                  </p>
                )}
                <Button fullWidth disabled={status === "sending"}>
                  {status === "sending" ? "Envoi..." : "Recevoir ma maquette gratuite"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
