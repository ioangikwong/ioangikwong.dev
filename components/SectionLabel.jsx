import { theme } from "./theme";

export function SectionLabel({ children }) {
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
