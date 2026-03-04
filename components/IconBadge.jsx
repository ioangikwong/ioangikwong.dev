import { theme } from "./theme";

export function IconBadge({ icon }) {
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
