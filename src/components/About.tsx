import { useEffect, useRef, useState } from "react";

interface SkillBarProps {
  label: string;
  level: number; // 0-100
}

const SkillBar = ({ label, level }: SkillBarProps) => {
  const [w, setW] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setW(level);
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-foreground/80">{label}</span>
        <span className="text-foreground/60">{w}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2 transition-all duration-700"
          style={{ width: `${w}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
};

const About = () => {
  const skills = ["ReactJs", "JavaScript", "PHP", "MySQL", "TailwindCSS", "HTML/CSS", "Drupal", "SharePoint", "Sitecore", "Salesforce", "JIRA", "Git"];

  return (
    <section id="about" className="container scroll-mt-24 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">About Me</h2>
        <p className="mt-4 text-foreground/70">
          Experienced and adaptable technology professional with a solid foundation in web development, digital transformation, and project management. I demonstrate a proven ability to build relationships, communicate effectively, and work both independently and as part of cross-functional teams.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {skills.map((s) => (
            <span key={s} className="px-3 py-1 rounded-full bg-secondary text-foreground/80 text-sm">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
        <SkillBar label="Web Development" level={95} />
        <SkillBar label="Content Management" level={92} />
        <SkillBar label="Digital Transformation" level={90} />
        <SkillBar label="Project Management" level={88} />
      </div>
    </section>
  );
};

export default About;
