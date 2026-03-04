import { theme } from "./theme";

export function Chip({ children, icon }) {
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
