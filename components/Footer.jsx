import { theme } from "./theme";
import { Icons } from "./Icons";

export function Footer() {
  const footerLinks = [
    { label: "Services", href: "#services" },
    { label: "Réalisations", href: "#realisations" },
    { label: "Prix", href: "#prix" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer
      style={{
        padding: "80px 24px 40px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
        >
          <div>
            <a href="#" style={{ display: "inline-flex", alignItems: "center" }}>
              <img src="/logo-white.svg" alt="Ioan Gi-Kwong" style={{ height: 28 }} />
            </a>
            <p
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 14,
                lineHeight: 1.7,
                color: theme.palette.grey[500],
                marginTop: 12,
                maxWidth: 320,
              }}
            >
              Développeur web freelance basé à Cowansville. Sites sur mesure, rapides et optimisés pour les PME du Québec.
            </p>
          </div>

          <div>
            <p
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 13,
                fontWeight: 600,
                color: theme.palette.grey[500],
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Navigation
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {footerLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: 14,
                    color: theme.palette.grey[700],
                    textDecoration: "none",
                    transition: theme.transition.default,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = theme.palette.black)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = theme.palette.grey[700])}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 13,
                fontWeight: 600,
                color: theme.palette.grey[500],
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a
                href="mailto:ioan@ioangikwong.dev"
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 14,
                  color: theme.palette.grey[700],
                  textDecoration: "none",
                  transition: theme.transition.default,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = theme.palette.black)}
                onMouseLeave={(e) => (e.currentTarget.style.color = theme.palette.grey[700])}
              >
                ioan@ioangikwong.dev
              </a>
              <span
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 14,
                  color: theme.palette.grey[700],
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Icons.MapPin /> Cowansville, QC
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.08)",
            marginBottom: 24,
          }}
        />

        <div
          className="footer-bottom"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <p
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 12,
                color: theme.palette.grey[300],
              }}
            >
              © 2026 Ioan Gi-Kwong
            </p>
            <a
              href="/confidentialite"
              style={{
                fontFamily: theme.fonts.body,
                fontSize: 12,
                color: theme.palette.grey[300],
                textDecoration: "none",
                transition: theme.transition.default,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.palette.grey[500])}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.palette.grey[300])}
            >
              Confidentialit&eacute;
            </a>
          </div>
          <p
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 12,
              color: theme.palette.grey[300],
            }}
          >
            TPS : 736810946 RT0001 · TVQ : 4007599558 TQ0001
          </p>
        </div>
      </div>
    </footer>
  );
}
