"use client";
import { useState } from "react";
import { theme } from "./theme";

export function Card({ children, featured, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: theme.palette.white,
        border: `1px solid ${theme.palette.grey[100]}`,
        borderRadius: theme.radii.lg,
        padding: 32,
        boxShadow: hovered ? theme.shadows.cardHover : theme.shadows.card,
        transform: hovered ? "translateY(-2px)" : "none",
        transition: theme.transition.card,
        overflow: "hidden",
        ...style,
      }}
    >
      {featured && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "#FAFAFA",
          }}
        />
      )}
      {children}
    </div>
  );
}
