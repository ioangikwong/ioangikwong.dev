import { theme } from "./theme";
import { FadeIn } from "./FadeIn";
import { SectionLabel } from "./SectionLabel";
import { SectionTitle } from "./SectionTitle";
import { Card } from "./Card";
import { IconBadge } from "./IconBadge";
import { CheckItem } from "./CheckItem";
import { Icons } from "./Icons";

export function Services() {
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
                Après la livraison, je m&apos;occupe de tout. Votre site reste en
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
