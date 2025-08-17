import { Code2, Database, Globe } from "lucide-react";

const items = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Full-stack development using ReactJs, JavaScript, PHP, and modern frameworks.",
  },
  { icon: Database, title: "Content Management", desc: "Expert in Drupal, SharePoint, Sitecore, and Salesforce platforms." },
  { icon: Globe, title: "Digital Transformation", desc: "Leading digital initiatives and cloud computing solutions." },
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
