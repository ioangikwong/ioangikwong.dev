import { theme } from "./theme";
import { Icons } from "./Icons";

export function CheckItem({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        fontSize: 14,
        fontFamily: theme.fonts.body,
        color: theme.palette.grey[700],
        lineHeight: 1.5,
      }}
    >
      <span
        style={{
          color: theme.palette.black,
          marginTop: 2,
          flexShrink: 0,
        }}
      >
        <Icons.Check />
      </span>
      <span>{children}</span>
    </div>
  );
}
