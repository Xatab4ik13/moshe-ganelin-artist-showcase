import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import logoAsset from "@/assets/moshe-ganelin-logo.png.asset.json";

export function MiniBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setVisible(y > 420 && y < last);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={`mini-bar fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-center bg-hero/90 backdrop-blur-md md:hidden ${
        visible ? "" : "mini-bar-hidden"
      }`}
    >
      <Link to="/" aria-label="На главную">
        <img src={logoAsset.url} alt="Moshe Ganelin" className="h-7 w-auto object-contain" />
      </Link>
    </div>
  );
}
