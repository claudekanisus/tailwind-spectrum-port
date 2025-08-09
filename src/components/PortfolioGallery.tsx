import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-react";
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

type Point3D = { x: number; y: number; z: number };

// Evenly distribute points on a sphere using the Fibonacci sphere algorithm
function fibonacciSphere(n: number): Point3D[] {
  const points: Point3D[] = [];
  const offset = 2 / n;
  const increment = Math.PI * (3 - Math.sqrt(5)); // Golden angle
  for (let i = 0; i < n; i++) {
    const y = i * offset - 1 + offset / 2; // y in [-1, 1]
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    points.push({ x, y, z });
  }
  return points;
}

const PortfolioGallery = () => {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState<number | null>(null);
  const [rotY, setRotY] = useState(0); // horizontal rotation (deg)
  const [rotX, setRotX] = useState(-10); // vertical rotation (deg)
  const [radius, setRadius] = useState(360);

  const points = useMemo(() => fibonacciSphere(IMAGES.length), []);
  const step = 15; // rotation step in degrees

  // Compute the index of the image most facing the camera (largest z after rotation)
  const activeIndex = useMemo(() => {
    const ax = (rotX * Math.PI) / 180;
    const ay = (rotY * Math.PI) / 180;
    let maxZ = -Infinity;
    let maxI = 0;
    for (let i = 0; i < points.length; i++) {
      const { x, y, z } = points[i];
      // Rotate around X
      const y1 = y * Math.cos(ax) - z * Math.sin(ax);
      const z1 = y * Math.sin(ax) + z * Math.cos(ax);
      const x1 = x;
      // Rotate around Y
      const x2 = x1 * Math.cos(ay) + z1 * Math.sin(ay);
      const z2 = -x1 * Math.sin(ay) + z1 * Math.cos(ay);
      if (z2 > maxZ) {
        maxZ = z2;
        maxI = i;
      }
    }
    return maxI;
  }, [points, rotX, rotY]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowLeft") setRotY((r) => r - step);
      if (e.key === "ArrowRight") setRotY((r) => r + step);
      if (e.key === "ArrowUp") setRotX((r) => Math.max(r - step, -80));
      if (e.key === "ArrowDown") setRotX((r) => Math.min(r + step, 80));
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
                transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                transition: "transform 700ms cubic-bezier(0.22,1,0.36,1)",
              }}
              aria-live="polite"
              aria-label="3D sphere image carousel"
            >
              {points.map((p, i) => {
                const tx = p.x * radius;
                const ty = p.y * radius;
                const tz = p.z * radius;
                return (
                  <div
                    key={i}
                    className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
                    style={{ transform: `translate3d(${tx}px, ${ty}px, ${tz}px)` }}
                  >
                    <button
                      className="relative -translate-x-1/2 -translate-y-1/2 transform group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg"
                      onClick={() => {
                        setIdx(i);
                        setOpen(true);
                      }}
                      aria-label={`Open ${IMAGES[i].title}`}
                    >
                      <img
                        src={IMAGES[i].src}
                        alt={`${IMAGES[i].title} — portfolio image`}
                        loading="lazy"
                        className="w-40 h-28 sm:w-44 sm:h-32 md:w-48 md:h-36 object-contain bg-muted rounded-lg border border-border shadow-md transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-t from-background/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-medium text-foreground/80 whitespace-nowrap">
                        {IMAGES[i].title}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Horizontal controls */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
              <div className="pointer-events-auto">
                <button
                  onClick={() => setRotY((r) => r - step)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label="Rotate left"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </div>
              <div className="pointer-events-auto">
                <button
                  onClick={() => setRotY((r) => r + step)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label="Rotate right"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Vertical controls */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-2">
              <div className="pointer-events-auto">
                <button
                  onClick={() => setRotX((r) => Math.max(r - step, -80))}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label="Rotate up"
                >
                  <ChevronUp className="h-5 w-5" />
                </button>
              </div>
              <div className="pointer-events-auto">
                <button
                  onClick={() => setRotX((r) => Math.min(r + step, 80))}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 backdrop-blur transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  aria-label="Rotate down"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-foreground/70">{IMAGES[activeIndex].title}</p>
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
