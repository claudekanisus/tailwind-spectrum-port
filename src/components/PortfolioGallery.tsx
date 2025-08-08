import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="work" className="container scroll-mt-24 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Portfolio</h2>
        <p className="mt-3 text-foreground/70">Selected works with a focus on clarity and motion.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {IMAGES.map((it, i) => (
          <button
            key={i}
            className="group relative overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
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
              className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="pointer-events-none absolute bottom-3 left-3 text-sm font-medium">{it.title}</span>
          </button>
        ))}
      </div>

      {open && idx !== null && (
        <div
          className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={IMAGES[idx].src} alt={`${IMAGES[idx].title} — enlarged`} className="w-full h-auto rounded-lg" />
            <p className="mt-3 text-center text-foreground/80">{IMAGES[idx].title}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PortfolioGallery;
