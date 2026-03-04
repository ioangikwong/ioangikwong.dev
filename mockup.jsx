import { useState, useEffect, useRef } from "react";

// ─── Theme Tokens ────────────────────────────────────────────
const theme = {
  palette: {
    black: "#FAFAFA",
    white: "#0A0A0A",
    grey: {
      50: "#141414",
      100: "#1E1E1E",
      200: "#2A2A2A",
      300: "#444444",
      500: "#9E9E9E",
      700: "#BDBDBD",
      900: "#E0E0E0",
    },
    primary: "#FAFAFA",
  },
  fonts: {
    display: "'Plus Jakarta Sans', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  shadows: {
    card: "0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.15)",
    cardHover: "0 10px 40px rgba(0,0,0,0.3)",
    nav: "0 1px 0 rgba(255,255,255,0.05)",
  },
  radii: { sm: 6, md: 12, lg: 16, xl: 24, pill: 100 },
  transition: {
    default: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    card: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fadeIn:
      "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
    nav: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

// ─── FadeIn (IntersectionObserver) ───────────────────────────
function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: theme.transition.fadeIn,
        transitionDelay: `${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Button ──────────────────────────────────────────────────
function Button({
  children,
  variant = "contained",
  size = "large",
  href,
  fullWidth,
  icon,
  onClick,
  style = {},
}) {
  const [hovered, setHovered] = useState(false);
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: theme.fonts.body,
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: "0.01em",
    border: "none",
    cursor: "pointer",
    borderRadius: theme.radii.md,
    transition: theme.transition.default,
    textDecoration: "none",
    width: fullWidth ? "100%" : undefined,
    ...(size === "large"
      ? { padding: "14px 32px" }
      : { padding: "10px 24px", fontSize: 13 }),
  };
  const variants = {
    contained: {
      background: hovered ? "#E0E0E0" : "#FAFAFA",
      color: "#0A0A0A",
      transform: hovered ? "translateY(-1px)" : "none",
    },
    outlined: {
      background: "transparent",
      color: theme.palette.black,
      border: `1.5px solid ${theme.palette.grey[200]}`,
      ...(hovered && {
        borderColor: theme.palette.black,
        transform: "translateY(-1px)",
      }),
    },
    text: {
      background: "transparent",
      color: theme.palette.black,
      padding: "10px 16px",
      ...(hovered && { color: theme.palette.grey[700] }),
    },
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {icon}
    </Tag>
  );
}

// ─── Card ────────────────────────────────────────────────────
function Card({ children, featured, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: theme.palette.white,
        border: `1px solid ${theme.palette.grey[100]}`,
        borderRadius: theme.radii.lg,
        padding: 32,
        boxShadow: hovered ? theme.shadows.cardHover : theme.shadows.card,
        transform: hovered ? "translateY(-2px)" : "none",
        transition: theme.transition.card,
        overflow: "hidden",
        ...style,
      }}
    >
      {featured && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "#FAFAFA",
          }}
        />
      )}
      {children}
    </div>
  );
}

// ─── TextField ───────────────────────────────────────────────
function TextField({ label, placeholder, multiline, rows = 4, name, value: controlledValue, onChange, inputStyle = {}, variant }) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const active = focused || value.length > 0;
  const Tag = multiline ? "textarea" : "input";
  const bright = variant === "bright";
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <label
        style={{
          position: "absolute",
          left: 16,
          top: active ? 8 : 18,
          fontSize: active ? 11 : 15,
          fontWeight: active ? 700 : 400,
          fontFamily: theme.fonts.body,
          color: bright ? (focused ? "#fff" : "rgba(255,255,255,0.7)") : (focused ? theme.palette.black : theme.palette.grey[500]),
          letterSpacing: active ? "0.08em" : "0",
          textTransform: active ? "uppercase" : "none",
          transition: theme.transition.default,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {label}
      </label>
      <Tag
        rows={multiline ? rows : undefined}
        name={name}
        placeholder={active ? placeholder : ""}
        value={value}
        onChange={(e) => {
          if (onChange) onChange(e);
          else setInternalValue(e.target.value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          height: multiline ? "auto" : 56,
          minHeight: multiline ? 120 : undefined,
          padding: active ? "26px 16px 10px" : "18px 16px",
          fontFamily: theme.fonts.body,
          fontSize: 15,
          color: theme.palette.black,
          background: "transparent",
          border: `1.5px solid ${focused ? theme.palette.black : theme.palette.grey[200]}`,
          borderRadius: theme.radii.md,
          outline: "none",
          resize: multiline ? "vertical" : "none",
          transition: theme.transition.default,
          boxSizing: "border-box",
          ...inputStyle,
        }}
      />
    </div>
  );
}

// ─── Chip ────────────────────────────────────────────────────
function Chip({ children, icon }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 14px",
        fontSize: 13,
        fontWeight: 500,
        fontFamily: theme.fonts.body,
        color: theme.palette.grey[700],
        background: theme.palette.grey[50],
        border: `1px solid ${theme.palette.grey[100]}`,
        borderRadius: theme.radii.pill,
      }}
    >
      {icon}
      {children}
    </span>
  );
}

// ─── Icons (inline SVG) ──────────────────────────────────────
const Icons = {
  Code: (props) => (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Server: (props) => (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <circle cx="6" cy="6" r="1" fill="currentColor" />
      <circle cx="6" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  Chat: (props) => (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Document: (props) => (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  Wrench: (props) => (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  Rocket: (props) => (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  Check: (props) => (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ArrowDown: (props) => (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  ),
  Mail: (props) => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  Menu: (props) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" {...props}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  Close: (props) => (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  MapPin: (props) => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Dollar: (props) => (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
};

// ─── Icon Badge ──────────────────────────────────────────────
function IconBadge({ icon }) {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: theme.palette.grey[50],
        border: `1px solid ${theme.palette.grey[100]}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        color: theme.palette.black,
      }}
    >
      {icon}
    </div>
  );
}

// ─── Section Label ───────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontSize: 13,
        fontWeight: 600,
        fontFamily: theme.fonts.body,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: theme.palette.grey[500],
        lineHeight: 1,
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  );
}

// ─── Section Title ───────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <h2
      style={{
        fontFamily: theme.fonts.display,
        fontSize: "clamp(28px, 4vw, 42px)",
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: "-0.03em",
        color: theme.palette.black,
        marginBottom: 48,
      }}
    >
      {children}
    </h2>
  );
}

// ─── Checklist Item ──────────────────────────────────────────
function CheckItem({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        fontSize: 14,
        fontFamily: theme.fonts.body,
        color: theme.palette.grey[700],
        lineHeight: 1.5,
      }}
    >
      <span
        style={{
          color: theme.palette.black,
          marginTop: 2,
          flexShrink: 0,
        }}
      >
        <Icons.Check />
      </span>
      <span>{children}</span>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────
function Nav({ onOpenPopup }) {
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
            <img src="/logo.svg" alt="Ioan Gi-Kwong" style={{ height: 28 }} />
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
            <Button size="small" style={{ cursor: "pointer" }} href={undefined} onClick={onOpenPopup}>
              Offre gratuite
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

// ─── Hero ────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "100px 24px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Abstract background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {/* Large glow orbs */}
        <div style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(600px, 80vw, 1000px)",
          height: "clamp(600px, 80vw, 1000px)",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute",
          top: "25%",
          left: "8%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute",
          top: "15%",
          right: "5%",
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)",
        }} />
        {/* Dot grid */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 65%)",
        }} />
      </div>

      <FadeIn style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <Chip icon={<Icons.MapPin />}>Cowansville, QC</Chip>
          <Chip icon={<Icons.Code style={{ width: 14, height: 14 }} />}>Développeur web</Chip>
        </div>
      </FadeIn>

      <FadeIn delay={0.1} style={{ position: "relative", zIndex: 1 }}>
        <h1
          style={{
            fontFamily: theme.fonts.display,
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.035em",
            color: theme.palette.black,
            maxWidth: 800,
            marginBottom: 24,
          }}
        >
          Des sites web rapides, modernes et abordables pour les PME d'ici.
        </h1>
      </FadeIn>

      <FadeIn delay={0.2} style={{ position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontFamily: theme.fonts.body,
            fontSize: "clamp(16px, 2.2vw, 19px)",
            fontWeight: 400,
            lineHeight: 1.65,
            color: theme.palette.grey[500],
            maxWidth: 580,
            marginBottom: 40,
          }}
        >
          Développeur web freelance basé à Cowansville. Je crée des sites sur
          mesure qui chargent vite, qui sont beaux sur mobile, et qui vous
          rapportent des clients.
        </p>
      </FadeIn>

      <FadeIn delay={0.3} style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Button href="#contact">Parlons de votre projet</Button>
          <Button variant="outlined" href="#services">
            Voir les services
          </Button>
        </div>
      </FadeIn>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          animation: "bounce 2s infinite",
          color: theme.palette.grey[300],
        }}
      >
        <Icons.ArrowDown />
      </div>
    </section>
  );
}

// ─── Services ────────────────────────────────────────────────
function Services() {
  return (
    <section
      id="services"
      style={{
        padding: "100px 24px",
        background: theme.palette.white,
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Services</SectionLabel>
          <SectionTitle>Ce que je fais</SectionTitle>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: 24,
          }}
        >
          {/* Card 1 — Site web sur mesure */}
          <FadeIn delay={0.1}>
            <Card style={{ height: "100%" }}>
              <div style={{ marginBottom: 20 }}>
                <IconBadge icon={<Icons.Code />} />
              </div>
              <h3
                style={{
                  fontFamily: theme.fonts.display,
                  fontSize: 20,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  color: theme.palette.black,
                  marginBottom: 12,
                }}
              >
                Site web sur mesure
              </h3>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: theme.palette.grey[500],
                  marginBottom: 20,
                }}
              >
                Chaque site est construit de zéro avec Next.js — pas de template
                WordPress, pas de page builder. Le résultat : un site
                ultra-rapide, optimisé pour Google, et qui reflète vraiment votre
                entreprise.
              </p>
              <div
                style={{
                  height: 1,
                  background: theme.palette.grey[100],
                  margin: "20px 0",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <CheckItem>Design personnalisé adapté à votre marque</CheckItem>
                <CheckItem>Responsive (mobile, tablette, desktop)</CheckItem>
                <CheckItem>Optimisé pour le SEO et la vitesse</CheckItem>
                <CheckItem>Formulaire de contact fonctionnel</CheckItem>
                <CheckItem>Déploiement + configuration du domaine</CheckItem>
              </div>
            </Card>
          </FadeIn>

          {/* Card 2 — Hébergement et maintenance */}
          <FadeIn delay={0.2}>
            <Card style={{ height: "100%" }}>
              <div style={{ marginBottom: 20 }}>
                <IconBadge icon={<Icons.Server />} />
              </div>
              <h3
                style={{
                  fontFamily: theme.fonts.display,
                  fontSize: 20,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                  color: theme.palette.black,
                  marginBottom: 12,
                }}
              >
                Hébergement et maintenance
              </h3>
              <p
                style={{
                  fontFamily: theme.fonts.body,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: theme.palette.grey[500],
                  marginBottom: 20,
                }}
              >
                Après la livraison, je m'occupe de tout. Votre site reste en
                ligne, rapide et à jour.
              </p>
              <div
                style={{
                  height: 1,
                  background: theme.palette.grey[100],
                  margin: "20px 0",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <CheckItem>Hébergement sur Cloudflare (rapide et fiable)</CheckItem>
                <CheckItem>Certificat SSL inclus</CheckItem>
                <CheckItem>Support par courriel</CheckItem>
                <CheckItem>Mises à jour mineures</CheckItem>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Prix ────────────────────────────────────────────────────
function Prix() {
  return (
    <section
      id="prix"
      style={{
        padding: "100px 24px",
        background: theme.palette.white,
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Prix</SectionLabel>
          <SectionTitle>Prix clairs, pas de surprises</SectionTitle>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
            gap: 24,
          }}
        >
          {/* Pricing Card 1 */}
          <FadeIn delay={0.1}>
            <Card featured style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: 20 }}>
                <IconBadge icon={<Icons.Code />} />
              </div>
              <h3
                style={{
                  fontFamily: theme.fonts.display,
                  fontSize: 20,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: theme.palette.black,
                  marginBottom: 8,
                }}
              >
                Site web sur mesure
              </h3>
              <div style={{ marginBottom: 20 }}>
                <span
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: 14,
                    color: theme.palette.grey[500],
                  }}
                >
                  À partir de
                </span>
                <div
                  style={{
                    fontFamily: theme.fonts.display,
                    fontSize: 48,
                    fontWeight: 700,
                    color: theme.palette.black,
                    lineHeight: 1.1,
                  }}
                >
                  $1,000
                </div>
              </div>
              <div
                style={{
                  height: 1,
                  background: theme.palette.grey[100],
                  margin: "0 0 20px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  flex: 1,
                }}
              >
                <CheckItem>Prix variable selon la complexité du projet</CheckItem>
                <CheckItem>Paiement en deux temps : 50% au dépôt, 50% à la livraison</CheckItem>
                <CheckItem>Taxes en sus (TPS + TVQ)</CheckItem>
              </div>
              <Button href="#contact" fullWidth style={{ marginTop: 24 }}>
                Demander une estimation
              </Button>
            </Card>
          </FadeIn>

          {/* Pricing Card 2 */}
          <FadeIn delay={0.2}>
            <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: 20 }}>
                <IconBadge icon={<Icons.Server />} />
              </div>
              <h3
                style={{
                  fontFamily: theme.fonts.display,
                  fontSize: 20,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: theme.palette.black,
                  marginBottom: 8,
                }}
              >
                Hébergement annuel
              </h3>
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    fontFamily: theme.fonts.display,
                    fontSize: 48,
                    fontWeight: 700,
                    color: theme.palette.black,
                    lineHeight: 1.1,
                  }}
                >
                  $200
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 500,
                      color: theme.palette.grey[500],
                    }}
                  >
                    {" "}
                    / année
                  </span>
                </div>
              </div>
              <div
                style={{
                  height: 1,
                  background: theme.palette.grey[100],
                  margin: "0 0 20px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  flex: 1,
                }}
              >
                <CheckItem>Facturé chaque 1er janvier</CheckItem>
                <CheckItem>Gratuit la première année partielle</CheckItem>
                <CheckItem>Taxes en sus (TPS + TVQ)</CheckItem>
              </div>
              <Button
                href="#contact"
                variant="outlined"
                fullWidth
                style={{ marginTop: 24 }}
              >
                En savoir plus
              </Button>
            </Card>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <p
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 14,
              color: theme.palette.grey[500],
              textAlign: "center",
              marginTop: 32,
              lineHeight: 1.6,
            }}
          >
            Chaque projet est différent. Écrivez-moi pour une estimation gratuite
            adaptée à vos besoins.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Processus ───────────────────────────────────────────────
function Processus() {
  const steps = [
    {
      icon: <Icons.Chat />,
      title: "On se parle",
      description:
        "Appelez-moi ou écrivez-moi. On discute de votre projet, de vos objectifs et de votre budget. C'est gratuit et sans engagement.",
    },
    {
      icon: <Icons.Document />,
      title: "Estimation et dépôt",
      description:
        "Je vous envoie une estimation claire avec le prix et les détails. Si ça vous convient, on démarre avec un dépôt de 50%.",
    },
    {
      icon: <Icons.Wrench />,
      title: "Développement",
      description:
        "Je construis votre site et vous le montre en cours de route. Vous me donnez vos commentaires, on ajuste ensemble.",
    },
    {
      icon: <Icons.Rocket />,
      title: "Livraison",
      description:
        "Votre site est en ligne. Je configure votre domaine, je vous montre comment ça marche, et je facture le solde de 50%.",
    },
  ];

  return (
    <section
      id="processus"
      style={{
        padding: "100px 24px",
        background: theme.palette.white,
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel>Processus</SectionLabel>
          <SectionTitle>Comment ça marche</SectionTitle>
        </FadeIn>

        <div>
          {steps.map((step, i) => (
            <FadeIn key={i} delay={0.1 * (i + 1)}>
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  paddingBottom: i < steps.length - 1 ? 32 : 0,
                  marginBottom: i < steps.length - 1 ? 32 : 0,
                  borderBottom:
                    i < steps.length - 1
                      ? `1px solid ${theme.palette.grey[200]}`
                      : "none",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <IconBadge icon={step.icon} />
                  <span
                    style={{
                      fontFamily: theme.fonts.body,
                      fontSize: 12,
                      fontWeight: 600,
                      color: theme.palette.grey[300],
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: theme.fonts.display,
                      fontSize: 18,
                      fontWeight: 600,
                      color: theme.palette.black,
                      marginBottom: 8,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: theme.fonts.body,
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: theme.palette.grey[500],
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Réalisations ────────────────────────────────────────────
function Realisations() {
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
              {/* Traffic lights */}
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
              </div>
              {/* URL bar */}
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

// ─── Contact ─────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ nom: "", courriel: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ nom: "", courriel: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "100px 24px",
        background: theme.palette.white,
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <SectionTitle>
            Prêt à avoir un site qui travaille pour vous?
          </SectionTitle>
          <p
            style={{
              fontFamily: theme.fonts.body,
              fontSize: "clamp(16px, 2.2vw, 19px)",
              lineHeight: 1.65,
              color: theme.palette.grey[500],
              marginTop: -24,
              marginBottom: 48,
            }}
          >
            Écrivez-moi pour une estimation gratuite. Réponse en 24h.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <Card style={{ padding: 36, textAlign: "left" }}>
            {status === "sent" ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
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
                  Message envoyé!
                </p>
                <p
                  style={{
                    fontFamily: theme.fonts.body,
                    fontSize: 15,
                    color: theme.palette.grey[500],
                  }}
                >
                  Je vous réponds en moins de 24h.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <TextField
                  label="Nom"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                />
                <TextField
                  label="Courriel"
                  name="courriel"
                  value={form.courriel}
                  onChange={handleChange}
                />
                <TextField
                  label="Message"
                  name="message"
                  multiline
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                />
                {status === "error" && (
                  <p
                    style={{
                      fontFamily: theme.fonts.body,
                      fontSize: 14,
                      color: "#ef4444",
                      margin: 0,
                    }}
                  >
                    Une erreur est survenue. Réessayez ou écrivez-moi
                    directement par courriel.
                  </p>
                )}
                <Button
                  fullWidth
                  icon={<Icons.Mail />}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Envoi..." : "Envoyer"}
                </Button>
              </form>
            )}
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 15,
              color: theme.palette.grey[500],
              marginTop: 24,
            }}
          >
            Ou écrivez-moi directement à{" "}
            <a
              href="mailto:ioan@ioangikwong.dev"
              style={{
                color: theme.palette.black,
                textDecoration: "underline",
                textUnderlineOffset: 3,
                transition: theme.transition.default,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = theme.palette.grey[700])
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = theme.palette.black)
              }
            >
              ioan@ioangikwong.dev
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────
function Footer() {
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
        {/* Top row — 3 columns */}
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
          }}
        >
          {/* Brand column */}
          <div>
            <a href="#" style={{ display: "inline-flex", alignItems: "center" }}>
              <img src="/logo.svg" alt="Ioan Gi-Kwong" style={{ height: 28 }} />
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

          {/* Navigation column */}
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

          {/* Contact column */}
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

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: `rgba(255,255,255,0.08)`,
            marginBottom: 24,
          }}
        />

        {/* Bottom row */}
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
          <p
            style={{
              fontFamily: theme.fonts.body,
              fontSize: 12,
              color: theme.palette.grey[300],
            }}
          >
            © 2026 Ioan Gi-Kwong
          </p>
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

// ─── Popup Maquette Gratuite ─────────────────────────────────
function PopupMaquette({ externalOpen }) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [scrollTriggered, setScrollTriggered] = useState(false);
  const [form, setForm] = useState({ nom: "", courriel: "", domaine: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const openPopup = () => {
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };

  // Scroll trigger
  useEffect(() => {
    // const dismissed = sessionStorage.getItem("popup_dismissed");
    // if (dismissed) return;
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

  // External trigger (bouton nav)
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
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
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
          {/* Close button */}
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
                  Recevez une maquette de votre page d'accueil
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

// ─── Main App ────────────────────────────────────────────────
export default function App() {
  const [popupTrigger, setPopupTrigger] = useState(0);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
        body { font-family: 'DM Sans', sans-serif; color: #FAFAFA; background: #0A0A0A; }
        a { color: inherit; text-decoration: none; }
        ::selection { background: #FAFAFA; color: #0A0A0A; }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-8px); }
          60% { transform: translateX(-50%) translateY(-4px); }
        }

        .popup-form input::placeholder { color: rgba(255,255,255,0.45); }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
          .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .footer-bottom { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
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
