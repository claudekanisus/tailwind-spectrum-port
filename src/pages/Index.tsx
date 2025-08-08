import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import PortfolioGallery from "@/components/PortfolioGallery";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <About />
        <PortfolioGallery />
        <Services />
        <Contact />
      </main>
      <footer className="border-t border-border py-10 text-center text-sm text-foreground/60">
        © {new Date().getFullYear()} Alex Doe. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
