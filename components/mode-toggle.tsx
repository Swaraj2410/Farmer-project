"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Avoid hydration mismatch by rendering a placeholder with same dimensions
    return (
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
        className="h-9 w-9"
      />
    );
  }

  const isDark = (theme === "dark") || (theme === "system" && resolvedTheme === "dark");

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-9 w-9 transition-colors"
      title={isDark ? "Light" : "Dark"}
    >
      {/* Icon swap with smooth transition */}
      <Sun className={`size-4 transition-all duration-300 ${isDark ? "scale-0 rotate-90" : "scale-100 rotate-0"}`} />
      <Moon className={`absolute size-4 transition-all duration-300 ${isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`} />
      <span className="sr-only">{isDark ? "Switch to light mode" : "Switch to dark mode"}</span>
    </Button>
  );
}
