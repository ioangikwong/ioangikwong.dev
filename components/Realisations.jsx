"use client";
import { useState } from "react";
import { theme } from "./theme";
import { FadeIn } from "./FadeIn";
import { SectionLabel } from "./SectionLabel";
import { SectionTitle } from "./SectionTitle";

export function Realisations() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="realisations"
      style={{
        padding: "100px 24px",
        background: theme.palette.white,
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Réalisations</SectionLabel>
          <SectionTitle>Un aperçu de mon travail</SectionTitle>
        </FadeIn>

        <FadeIn delay={0.15}>
          <a
            href="https://plantationbernier.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: "block",
              background: theme.palette.white,
              border: `1px solid ${theme.palette.grey[100]}`,
              borderRadius: theme.radii.lg,
              boxShadow: hovered ? theme.shadows.cardHover : theme.shadows.card,
              transform: hovered ? "translateY(-2px)" : "none",
              transition: theme.transition.card,
              textDecoration: "none",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            {/* Browser frame */}
            <div
              style={{
                background: "#1A1A1A",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
              </div>
              <div
                style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 6,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontFamily: theme.fonts.body,
                  color: theme.palette.grey[500],
                  textAlign: "center",
                }}
              >
                plantationbernier.com
              </div>
              <div style={{ width: 46 }} />
            </div>
            {/* Screenshot */}
            <img
              src="/plantation-bernier.png"
              alt="Plantation Bernier — site desktop"
              style={{
                width: "100%",
                maxHeight: 580,
                objectFit: "cover",
                objectPosition: "top",
                display: "block",
              }}
            />
            {/* Project info bar */}
            <div style={{ padding: "20px 32px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <h3
                  style={{
                    fontFamily: theme.fonts.display,
                    fontSize: 20,
                    fontWeight: 700,
                    color: theme.palette.black,
                    letterSpacing: "-0.02em",
                  }}
                >
                  Plantation Bernier
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Next.js", "Bilingue", "Responsive"].map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        fontFamily: theme.fonts.body,
                        color: theme.palette.grey[500],
                        background: theme.palette.grey[100],
                        border: `1px solid ${theme.palette.grey[200]}`,
                        borderRadius: theme.radii.pill,
                        padding: "3px 10px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: theme.fonts.body,
                  fontSize: 14,
                  fontWeight: 600,
                  color: theme.palette.black,
                }}
              >
                Voir le site
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
