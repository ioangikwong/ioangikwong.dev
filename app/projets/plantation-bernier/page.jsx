"use client";
import { theme } from "../../../components/theme";
import { FadeIn } from "../../../components/FadeIn";
import { Footer } from "../../../components/Footer";

export default function PlantationBernier() {
  return (
    <>
      {/* Minimal nav bar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          zIndex: 1000,
          background: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            maxWidth: 1000,
            margin: "0 auto",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
          }}
        >
          <a href="/" style={{ display: "flex", alignItems: "center" }}>
            <img src="/logo-white.svg" alt="Ioan Gi-Kwong" style={{ height: 28 }} />
          </a>
          <a
            href="/"
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 14,
              fontWeight: 500,
              color: theme.palette.grey[500],
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: theme.transition.default,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = theme.palette.black)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = theme.palette.grey[500])
            }
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour
          </a>
        </div>
      </nav>

      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <section
          style={{
            padding: "80px 24px 60px",
            background: theme.palette.white,
          }}
        >
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <FadeIn>
              <a
                href="/"
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 13,
                  fontWeight: 500,
                  color: theme.palette.grey[500],
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  marginBottom: 32,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Réalisations
              </a>
              <h1
                style={{
                  fontFamily: theme.fonts.display,
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: theme.palette.black,
                  marginBottom: 20,
                }}
              >
                Plantation Bernier
              </h1>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: theme.palette.grey[500],
                  marginBottom: 32,
                }}
              >
                Refonte complète du site web pour un producteur de sapins de
                Noël et d'épinettes à Lac-Brome, en activité depuis plus de 35
                ans.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Astro", "Bilingue", "Responsive", "Cloudflare Pages"].map(
                  (tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        fontFamily: theme.fonts.body,
                        color: theme.palette.grey[500],
                        background: theme.palette.grey[100],
                        border: `1px solid ${theme.palette.grey[200]}`,
                        borderRadius: theme.radii.pill,
                        padding: "5px 14px",
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Screenshot desktop */}
        <section style={{ padding: "0 24px 80px", background: theme.palette.white }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <FadeIn delay={0.1}>
              <div
                style={{
                  border: `1px solid ${theme.palette.grey[200]}`,
                  borderRadius: theme.radii.lg,
                  overflow: "hidden",
                }}
              >
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
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#ff5f57",
                      }}
                    />
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#febc2e",
                      }}
                    />
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#28c840",
                      }}
                    />
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
                <img
                  src="/plantation-bernier.png"
                  alt="Plantation Bernier — version desktop"
                  style={{
                    width: "100%",
                    display: "block",
                  }}
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: "80px 24px", background: theme.palette.white }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {/* Le contexte */}
            <FadeIn>
              <h2
                style={{
                  fontFamily: theme.fonts.display,
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: theme.palette.black,
                  marginBottom: 16,
                }}
              >
                Le contexte
              </h2>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: theme.palette.grey[700],
                  marginBottom: 24,
                }}
              >
                Plantation Bernier est une entreprise familiale de Lac-Brome
                spécialisée dans la production de sapins de Noël et d'épinettes
                pour la transplantation. Avec plus de 35 ans d'expérience,
                l'entreprise avait besoin d'un site web moderne pour remplacer
                son ancien site Weebly, qui ne reflétait plus la qualité de
                leurs produits ni l'ampleur de leurs opérations.
              </p>
            </FadeIn>

            {/* Le mandat */}
            <FadeIn delay={0.1}>
              <h2
                style={{
                  fontFamily: theme.fonts.display,
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: theme.palette.black,
                  marginBottom: 16,
                }}
              >
                Le mandat
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                {[
                  "Refonte complète — design moderne qui met en valeur les produits",
                  "Site bilingue (français / anglais) avec traduction automatique",
                  "Catalogue de produits clair avec prix et processus de commande",
                  "Hébergement ultra-rapide sur Cloudflare Pages",
                  "Migration depuis l'ancien hébergeur et transfert de domaine",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: theme.palette.grey[500],
                        marginTop: 9,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: theme.fonts.body,
                        fontSize: 16,
                        lineHeight: 1.7,
                        color: theme.palette.grey[700],
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Le resultat */}
            <FadeIn delay={0.15}>
              <h2
                style={{
                  fontFamily: theme.fonts.display,
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: theme.palette.black,
                  marginBottom: 16,
                }}
              >
                Le résultat
              </h2>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: theme.palette.grey[700],
                  marginBottom: 32,
                }}
              >
                Un site bilingue rapide et moderne qui présente clairement les
                produits, les prix et le processus de commande. Le site charge
                en moins d'une seconde grâce à l'infrastructure Cloudflare et
                offre une expérience fluide sur mobile comme sur desktop.
              </p>
            </FadeIn>

            {/* CTA */}
            <FadeIn delay={0.2}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 16,
                  justifyContent: "center",
                  padding: "40px 0",
                  borderTop: `1px solid ${theme.palette.grey[100]}`,
                }}
              >
                <a
                  href="https://plantationbernier.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: theme.fonts.body,
                    fontSize: 15,
                    fontWeight: 600,
                    color: theme.palette.white,
                    background: theme.palette.black,
                    padding: "12px 24px",
                    borderRadius: theme.radii.md,
                    textDecoration: "none",
                    transition: theme.transition.default,
                  }}
                >
                  Voir le site en ligne
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
                <a
                  href="/#contact"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: theme.fonts.body,
                    fontSize: 15,
                    fontWeight: 600,
                    color: theme.palette.black,
                    background: "transparent",
                    padding: "12px 24px",
                    borderRadius: theme.radii.md,
                    border: `1px solid ${theme.palette.grey[200]}`,
                    textDecoration: "none",
                    transition: theme.transition.default,
                  }}
                >
                  Discuter de votre projet
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
