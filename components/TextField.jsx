"use client";
import { useState } from "react";
import { theme } from "./theme";

export function TextField({ label, placeholder, multiline, rows = 4, name, value: controlledValue, onChange, inputStyle = {}, variant }) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const active = focused || value.length > 0;
  const Tag = multiline ? "textarea" : "input";
  const bright = variant === "bright";
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <label
        style={{
          position: "absolute",
          left: 16,
          top: active ? 8 : 18,
          fontSize: active ? 11 : 15,
          fontWeight: active ? 700 : 400,
          fontFamily: theme.fonts.body,
          color: bright ? (focused ? "#fff" : "rgba(255,255,255,0.7)") : (focused ? theme.palette.black : theme.palette.grey[500]),
          letterSpacing: active ? "0.08em" : "0",
          textTransform: active ? "uppercase" : "none",
          transition: theme.transition.default,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {label}
      </label>
      <Tag
        rows={multiline ? rows : undefined}
        name={name}
        placeholder={active ? placeholder : ""}
        value={value}
        onChange={(e) => {
          if (onChange) onChange(e);
          else setInternalValue(e.target.value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          height: multiline ? "auto" : 56,
          minHeight: multiline ? 120 : undefined,
          padding: active ? "26px 16px 10px" : "18px 16px",
          fontFamily: theme.fonts.body,
          fontSize: 15,
          color: theme.palette.black,
          background: "transparent",
          border: `1.5px solid ${focused ? theme.palette.black : theme.palette.grey[200]}`,
          borderRadius: theme.radii.md,
          outline: "none",
          resize: multiline ? "vertical" : "none",
          transition: theme.transition.default,
          boxSizing: "border-box",
          ...inputStyle,
        }}
      />
    </div>
  );
}
