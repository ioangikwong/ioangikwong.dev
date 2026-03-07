import { theme } from "../../components/theme";

export const metadata = {
  title: "Politique de confidentialité | Ioan Gi-Kwong",
  description:
    "Politique de confidentialité et protection des renseignements personnels.",
  robots: { index: false, follow: false },
};

export default function Confidentialite() {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "120px 24px 80px",
        fontFamily: theme.fonts.body,
        color: theme.palette.grey[700],
        lineHeight: 1.8,
        fontSize: 15,
      }}
    >
      <a
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 14,
          color: theme.palette.grey[500],
          textDecoration: "none",
          marginBottom: 32,
        }}
      >
        &larr; Retour
      </a>

      <h1
        style={{
          fontFamily: theme.fonts.display,
          fontSize: 32,
          fontWeight: 800,
          color: theme.palette.black,
          letterSpacing: "-0.02em",
          marginBottom: 8,
        }}
      >
        Politique de confidentialit&eacute;
      </h1>
      <p style={{ color: theme.palette.grey[500], marginBottom: 48 }}>
        Derni&egrave;re mise &agrave; jour : 7 mars 2026
      </p>

      <Section title="1. Responsable">
        <p>
          Ioan Gi-Kwong, travailleur autonome, est responsable de la protection
          des renseignements personnels collect&eacute;s via ce site web.
        </p>
        <p>
          Courriel :{" "}
          <a href="mailto:ioan@ioangikwong.dev" style={linkStyle}>
            ioan@ioangikwong.dev
          </a>
          <br />
          Localisation : Cowansville, QC, Canada
        </p>
      </Section>

      <Section title="2. Renseignements collect&eacute;s">
        <p>
          Lorsque vous utilisez le formulaire de contact, les renseignements
          suivants sont collect&eacute;s :
        </p>
        <ul style={ulStyle}>
          <li>Votre nom</li>
          <li>Votre adresse courriel</li>
          <li>Le contenu de votre message</li>
        </ul>
        <p>
          Aucun cookie de suivi, aucun pixel de tra&ccedil;age et aucun outil
          d&rsquo;analyse tiers n&rsquo;est utilis&eacute; sur ce site. Les
          statistiques de fr&eacute;quentation sont fournies par Cloudflare
          Analytics, un service c&ocirc;t&eacute; serveur qui ne d&eacute;pose
          aucun cookie et ne collecte aucun renseignement personnel.
        </p>
      </Section>

      <Section title="3. Finalit&eacute;s">
        <p>
          Les renseignements collect&eacute;s servent exclusivement &agrave; :
        </p>
        <ul style={ulStyle}>
          <li>R&eacute;pondre &agrave; votre demande</li>
          <li>
            Vous transmettre une estimation ou un suivi li&eacute; &agrave;
            votre projet
          </li>
        </ul>
        <p>
          Vos renseignements ne sont jamais vendus, lou&eacute;s ou
          partag&eacute;s &agrave; des tiers &agrave; des fins commerciales.
        </p>
      </Section>

      <Section title="4. Tiers impliqu&eacute;s">
        <p>
          Le traitement de votre message implique les services suivants,
          strictement n&eacute;cessaires au fonctionnement du formulaire :
        </p>
        <ul style={ulStyle}>
          <li>
            <strong>Cloudflare</strong> (h&eacute;bergement du site et
            ex&eacute;cution du formulaire)
          </li>
          <li>
            <strong>Resend</strong> (acheminement du courriel de notification)
          </li>
        </ul>
        <p>
          Ces fournisseurs traitent vos donn&eacute;es conform&eacute;ment
          &agrave; leurs propres politiques de confidentialit&eacute; et ne les
          utilisent pas &agrave; d&rsquo;autres fins.
        </p>
      </Section>

      <Section title="5. Conservation">
        <p>
          Les messages re&ccedil;us via le formulaire sont conserv&eacute;s dans
          la bo&icirc;te courriel du responsable pour la dur&eacute;e
          n&eacute;cessaire au traitement de votre demande, puis
          supprim&eacute;s. Aucune base de donn&eacute;es de contacts n&rsquo;est
          constitu&eacute;e &agrave; partir du formulaire.
        </p>
      </Section>

      <Section title="6. Vos droits">
        <p>
          Conform&eacute;ment &agrave; la Loi sur la protection des
          renseignements personnels dans le secteur priv&eacute; (Loi 25), vous
          avez le droit de :
        </p>
        <ul style={ulStyle}>
          <li>
            Acc&eacute;der aux renseignements personnels que nous d&eacute;tenons
            &agrave; votre sujet
          </li>
          <li>Demander leur rectification ou leur suppression</li>
          <li>Retirer votre consentement &agrave; tout moment</li>
        </ul>
        <p>
          Pour exercer ces droits, &eacute;crivez &agrave;{" "}
          <a href="mailto:ioan@ioangikwong.dev" style={linkStyle}>
            ioan@ioangikwong.dev
          </a>
          . Une r&eacute;ponse vous sera fournie dans un d&eacute;lai de 30
          jours.
        </p>
      </Section>

      <Section title="7. S&eacute;curit&eacute;">
        <p>
          Ce site est prot&eacute;g&eacute; par un certificat SSL (HTTPS). Les
          donn&eacute;es transmises via le formulaire sont chiffr&eacute;es en
          transit. Des mesures techniques raisonnables sont en place pour
          prot&eacute;ger vos renseignements contre tout acc&egrave;s non
          autoris&eacute;.
        </p>
      </Section>

      <Section title="8. Modification de cette politique">
        <p>
          Cette politique peut &ecirc;tre mise &agrave; jour
          p&eacute;riodiquement. La date de derni&egrave;re mise &agrave; jour
          est indiqu&eacute;e en haut de cette page.
        </p>
      </Section>
    </main>
  );
}

const linkStyle = {
  color: "#FAFAFA",
  textDecoration: "underline",
  textUnderlineOffset: 3,
};

const ulStyle = {
  paddingLeft: 20,
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: "#FAFAFA",
          letterSpacing: "-0.01em",
          marginBottom: 16,
        }}
      >
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {children}
      </div>
    </section>
  );
}
