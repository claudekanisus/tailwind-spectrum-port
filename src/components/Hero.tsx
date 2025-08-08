import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--x", `${x}px`);
      el.style.setProperty("--y", `${y}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="home" ref={ref} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(600px circle at var(--x) var(--y), hsl(var(--brand) / 0.15), transparent 40%)",
        }}
        aria-hidden
      />
      <div className="container relative z-10 text-center animate-fade-in">
        <p className="text-sm tracking-widest text-foreground/60">PORTFOLIO</p>
        <h1 className="mt-3 text-4xl md:text-6xl font-bold">
          Alex Doe — Minimal Dark Portfolio
        </h1>
        <p className="mt-4 text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
          Designer & developer crafting elegant, performant digital experiences.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button asChild variant="gradient" className="hover-scale">
            <a href="#work">View Work</a>
          </Button>
          <Button asChild variant="outline" className="hover-scale">
            <a href="#contact">Contact</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
