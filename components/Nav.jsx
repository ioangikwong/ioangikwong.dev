"use client";
import { useState, useEffect } from "react";
import { theme } from "./theme";
import { Button } from "./Button";
import { Icons } from "./Icons";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Réalisations", href: "#realisations" },
    { label: "Prix", href: "#prix" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          zIndex: 1000,
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? theme.shadows.nav : "none",
          transition: theme.transition.nav,
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
          <a href="#" style={{ display: "flex", alignItems: "center" }}>
            <img src="/logo-white.svg" alt="Ioan Gi-Kwong" style={{ height: 28 }} />
          </a>

          {/* Desktop links */}
          <div
            className="nav-links-desktop"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 14,
                  fontWeight: 500,
                  color: theme.palette.grey[700],
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  transition: theme.transition.default,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = theme.palette.black)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = theme.palette.grey[700])
                }
              >
                {l.label}
              </a>
            ))}
            <Button size="small" href="#contact">
              Contact
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(true)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: theme.palette.black,
            }}
          >
            <Icons.Menu />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            background: "rgba(10,10,10,0.97)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: theme.palette.black,
            }}
          >
            <Icons.Close />
          </button>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: theme.fonts.display,
                fontSize: 28,
                fontWeight: 700,
                color: theme.palette.black,
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ))}
          <Button
            href="#contact"
            style={{ marginTop: 16 }}
            onClick={() => setMenuOpen(false)}
          >
            Parlons de votre projet
          </Button>
        </div>
      )}
    </>
  );
}
