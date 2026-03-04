import { theme } from "./theme";

export function SectionTitle({ children }) {
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
