import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "@/assets/portfolio-1.jpg";
import img2 from "@/assets/portfolio-2.jpg";
import img3 from "@/assets/portfolio-3.jpg";
import img4 from "@/assets/portfolio-4.jpg";
import img5 from "@/assets/portfolio-5.jpg";
import img6 from "@/assets/portfolio-6.jpg";

const IMAGES = [
  { src: img1, title: "Dashboard UI" },
  { src: img2, title: "SaaS Landing" },
  { src: img3, title: "Mobile App" },
  { src: img4, title: "Analytics" },
  { src: img5, title: "Marketing Site" },
  { src: img6, title: "Concept UI" },
];

const PortfolioGallery = () => {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const [radius, setRadius] = useState(360);
  const step = 360 / IMAGES.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + IMAGES.length) % IMAGES.length);
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % IMAGES.length);
    };
    const onResize = () => {
      const r = Math.max(220, Math.min(420, Math.floor(window.innerWidth * 0.35)));
      setRadius(r);
    };
    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="work" className="container scroll-mt-24 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Portfolio</h2>
        <p className="mt-3 text-foreground/70">Selected works with a focus on clarity and motion.</p>
      </div>

      <div className="mt-10">
        <div className="relative mx-auto max-w-6xl">
          <div className="relative h-[360px] sm:h-[420px] md:h-[480px] [perspective:1000px]">
            <div
              className="absolute inset-0 [transform-style:preserve-3d] will-change-transform"
              style={{
                transform: `rotateY(${-current * step}deg)`,
                transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
              }}
              aria-live="polite"
              aria-label="3D image carousel"
            >
              {IMAGES.map((it, i) => {
                const angle = i * step;
                const activeIndex = ((current % IMAGES.length) + IMAGES.length) % IMAGES.length;
                const isActive = i === activeIndex;
                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
                    style={{ transform: `rotateY(${angle}deg) translateZ(${radius}px)` }}
                  >
                    <button
                      className="relative -translate-x-1/2 -translate-y-1/2 transform group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg"
                      onClick={() => {
                        setIdx(i);
                        setOpen(true);
                      }}
                      aria-label={`Open ${it.title}`}
                    >
                      <img
                        src={it.src}
                        alt={`${it.title} — portfolio image`}
                        loading="lazy"
                        className={
                          `w-64 h-40 sm:w-72 sm:h-48 md:w-80 md:h-56 object-contain bg-muted rounded-lg border border-border shadow-md transition-all duration-500 ${isActive ? "scale-105 opacity-100 shadow-[var(--shadow-elegant)]" : "scale-95 opacity-70"}`
                        }
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-background/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-foreground/80 whitespace-nowrap">
                        {it.title}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
              <div className="pointer-events-auto">
                <button
                  onClick={() => setCurrent((c) => (c - 1 + IMAGES.length) % IMAGES.length)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              <div className="pointer-events-auto">
                <button
                  onClick={() => setCurrent((c) => (c + 1) % IMAGES.length)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-foreground/70">{IMAGES[((current % IMAGES.length) + IMAGES.length) % IMAGES.length].title}</p>
        </div>
      </div>

      {open && idx !== null && (
        <div
          className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={IMAGES[idx].src} alt={`${IMAGES[idx].title} — enlarged`} className="mx-auto block max-h-[75vh] w-auto h-auto rounded-lg object-contain" />
            <p className="mt-3 text-center text-foreground/80">{IMAGES[idx].title}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioGallery;
