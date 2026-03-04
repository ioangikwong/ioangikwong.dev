import { theme } from "./theme";
import { FadeIn } from "./FadeIn";
import { SectionLabel } from "./SectionLabel";
import { SectionTitle } from "./SectionTitle";
import { Card } from "./Card";
import { IconBadge } from "./IconBadge";
import { CheckItem } from "./CheckItem";
import { Button } from "./Button";
import { Icons } from "./Icons";

export function Prix() {
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
