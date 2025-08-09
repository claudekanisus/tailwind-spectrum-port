import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
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
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!carouselApi) return;
    const update = () => setCurrent(carouselApi.selectedScrollSnap());
    update();
    carouselApi.on("select", update);
    carouselApi.on("reInit", update);
    return () => {
      carouselApi.off("select", update);
      carouselApi.off("reInit", update);
    };
  }, [carouselApi]);

  return (
    <section id="work" className="container scroll-mt-24 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Portfolio</h2>
        <p className="mt-3 text-foreground/70">Selected works with a focus on clarity and motion.</p>
      </div>

      <div className="mt-10">
        <Carousel setApi={setCarouselApi} opts={{ align: "start", loop: true }} className="relative mx-auto max-w-6xl">
          <CarouselContent>
            {IMAGES.map((it, i) => (
              <CarouselItem key={i} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <button
                  className="group block w-full rounded-lg border border-border bg-muted shadow-md transition-all hover-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  onClick={() => {
                    setIdx(i);
                    setOpen(true);
                  }}
                  aria-label={`Open ${it.title}`}
                >
                  <div className="aspect-[4/3] w-full grid place-items-center rounded-lg overflow-hidden">
                    <img
                      src={it.src}
                      alt={`${it.title} — portfolio image`}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain object-center"
                    />
                  </div>
                  <div className="pointer-events-none p-3 text-center text-sm font-medium text-foreground/80">
                    {it.title}
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <p className="mt-6 text-center text-foreground/70">{IMAGES[current].title}</p>
      </div>
 
      {open && idx !== null && (
        <div
          className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setOpen(false)}
        >
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={IMAGES[idx].src} alt={`${IMAGES[idx].title} — enlarged`} className="mx-auto block max-h-[75vh] w-auto h-auto rounded-lg object-contain object-center" />
            <p className="mt-3 text-center text-foreground/80">{IMAGES[idx].title}</p>
          </div>
        </div>
      )}
    </section>
  );
};
 
export default PortfolioGallery;
