"use client";

import { useEffect, useState } from "react";

export function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.localStorage.getItem("abhay-portfolio-sound") !== "off");
  }, []);

  function toggleSound() {
    const next = !enabled;
    setEnabled(next);
    window.localStorage.setItem("abhay-portfolio-sound", next ? "on" : "off");
    window.dispatchEvent(new Event("portfolio-sound-change"));
  }

  return (
    <button
      aria-label={enabled ? "Mute website sounds" : "Turn on website sounds"}
      className="theme-toggle sound-toggle"
      data-sound-toggle
      onClick={toggleSound}
      title={enabled ? "Mute sounds" : "Turn on sounds"}
      type="button"
    >
      <span aria-hidden="true">{enabled ? "♫" : "×"}</span>
    </button>
  );
}
