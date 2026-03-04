import { theme } from "./theme";
import { FadeIn } from "./FadeIn";
import { Chip } from "./Chip";
import { Button } from "./Button";
import { Icons } from "./Icons";

export function Hero() {
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
          Des sites web rapides, modernes et abordables pour les PME d&apos;ici.
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
