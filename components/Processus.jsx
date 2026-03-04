import { theme } from "./theme";
import { FadeIn } from "./FadeIn";
import { SectionLabel } from "./SectionLabel";
import { SectionTitle } from "./SectionTitle";
import { IconBadge } from "./IconBadge";
import { Icons } from "./Icons";

export function Processus() {
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
