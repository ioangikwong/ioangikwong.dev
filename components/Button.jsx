"use client";
import { useState } from "react";
import { theme } from "./theme";

export function Button({
  children,
  variant = "contained",
  size = "large",
  href,
  fullWidth,
  icon,
  onClick,
  disabled,
  style = {},
}) {
  const [hovered, setHovered] = useState(false);
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: theme.fonts.body,
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: "0.01em",
    border: "none",
    cursor: "pointer",
    borderRadius: theme.radii.md,
    transition: theme.transition.default,
    textDecoration: "none",
    width: fullWidth ? "100%" : undefined,
    ...(size === "large"
      ? { padding: "14px 32px" }
      : { padding: "10px 24px", fontSize: 13 }),
  };
  const variants = {
    contained: {
      background: hovered ? "#E0E0E0" : "#FAFAFA",
      color: "#0A0A0A",
      transform: hovered ? "translateY(-1px)" : "none",
    },
    outlined: {
      background: "transparent",
      color: theme.palette.black,
      border: `1.5px solid ${theme.palette.grey[200]}`,
      ...(hovered && {
        borderColor: theme.palette.black,
        transform: "translateY(-1px)",
      }),
    },
    text: {
      background: "transparent",
      color: theme.palette.black,
      padding: "10px 16px",
      ...(hovered && { color: theme.palette.grey[700] }),
    },
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, ...variants[variant], ...style }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {icon}
    </Tag>
  );
}
