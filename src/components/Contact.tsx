import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const errs: typeof errors = {};

    if (!name) errs.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    if (message.length < 10) errs.message = "Message should be at least 10 characters";

    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setTimeout(() => {
        form.reset();
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
      }, 500);
    }
  };

  return (
    <section id="contact" className="container scroll-mt-24 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Contact</h2>
        <p className="mt-3 text-foreground/70">Have a project in mind? Let’s talk.</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="mt-10 max-w-2xl mx-auto grid gap-4">
        <div>
          <label htmlFor="name" className="block text-sm mb-1">Name</label>
          <input id="name" name="name" className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-brand" />
          {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm mb-1">Email</label>
          <input id="email" name="email" type="email" className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-brand" />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="message" className="block text-sm mb-1">Message</label>
          <textarea id="message" name="message" rows={5} className="w-full rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-brand" />
          {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-foreground/60">I typically reply within 24 hours.</p>
          <Button type="submit" variant="gradient" className="w-full sm:w-auto hover-scale">Send Message</Button>
        </div>
        {success && (
          <div className="mt-2 rounded-md border border-brand/30 bg-secondary p-3 animate-scale-in">
            <p className="text-sm">Thanks! Your message has been sent.</p>
          </div>
        )}
      </form>
    </section>
  );
};

export default Contact;
