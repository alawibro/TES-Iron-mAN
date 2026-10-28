import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
