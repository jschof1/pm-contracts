import type { ThemeTokens } from "@/types/theme";

export const applyTheme = (theme: ThemeTokens): void => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  Object.entries(theme.cssVariables).forEach(([variable, value]) => {
    root.style.setProperty(variable, value);
  });

  if (theme.darkCssVariables) {
    const styleTagId = "runtime-theme-dark-variables";
    const existing = document.getElementById(styleTagId);
    const cssRules = `.dark{${Object.entries(theme.darkCssVariables)
      .map(([variable, value]) => `${variable}:${value};`)
      .join("")}}`;

    if (existing) {
      existing.textContent = cssRules;
      return;
    }

    const style = document.createElement("style");
    style.id = styleTagId;
    style.textContent = cssRules;
    document.head.appendChild(style);
  }
};

export default applyTheme;
