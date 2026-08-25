import { Play } from "lucide-react";
import { useRef, useState } from "react";

import type { Video } from "@/lib/site-data";

export function VideoCard({ video, className = "" }: { video: Video; className?: string }) {
  const [playing, setPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--rx", `${(-y * 9).toFixed(2)}deg`);
    card.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
  };

  const reset = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  };

  return (
    <article className={`video-tilt ${className}`} onMouseMove={handleMove} onMouseLeave={reset}>
      <div ref={cardRef} className="video-frame">
        <div className="relative aspect-video overflow-hidden rounded-[0.75rem] bg-hero">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button type="button" onClick={() => setPlaying(true)} aria-label={`Смотреть: ${video.title}`} className="group absolute inset-0 h-full w-full">
              <img
                src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                loading="lazy"
                className="h-full w-full scale-[1.35] object-cover transition duration-700 group-hover:scale-[1.4]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-hero/80 via-hero/10 to-transparent" />
              <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brass/70 bg-hero/40 backdrop-blur-sm transition group-hover:scale-110">
                <Play className="size-6 fill-brass text-brass" />
              </span>
            </button>
          )}
        </div>
        <h3 className="mt-5 line-clamp-2 min-h-[3.4rem] font-display text-lg leading-snug text-background">{video.title}</h3>
      </div>
    </article>
  );
}
