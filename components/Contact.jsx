"use client";
import { useState } from "react";
import { theme } from "./theme";
import { FadeIn } from "./FadeIn";
import { SectionTitle } from "./SectionTitle";
import { Card } from "./Card";
import { TextField } from "./TextField";
import { Button } from "./Button";
import { Icons } from "./Icons";

export function Contact() {
  const [form, setForm] = useState({ nom: "", courriel: "", message: "" });
  const [status, setStatus] = useState("idle");

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
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Contact form error:", res.status, data);
        throw new Error(data.error || res.statusText);
      }
      setStatus("sent");
      setForm({ nom: "", courriel: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
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
