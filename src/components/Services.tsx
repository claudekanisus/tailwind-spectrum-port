import { Code2, Palette, Smartphone } from "lucide-react";

const items = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    desc: "Clean, accessible interfaces with TypeScript and modern tooling.",
  },
  { icon: Palette, title: "Product Design", desc: "Systems, flows, and pixels that feel effortless." },
  { icon: Smartphone, title: "Responsive Apps", desc: "Fast experiences across devices and screens." },
];

const Services = () => {
  return (
    <section id="services" className="container scroll-mt-24 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Services</h2>
        <p className="mt-3 text-foreground/70">From concept to polished interfaces.</p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <article
            key={it.title}
            className="rounded-xl border border-border bg-card/50 p-6 hover-scale hover:shadow-lg hover:shadow-brand/20 transition-shadow"
          >
            <it.icon className="mb-4" />
            <h3 className="text-xl font-semibold">{it.title}</h3>
            <p className="mt-2 text-foreground/70 text-sm">{it.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;
