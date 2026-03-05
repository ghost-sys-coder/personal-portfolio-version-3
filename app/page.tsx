import About from "@/components/shared/About";
import Contact from "@/components/shared/ContactForm";
import Experience from "@/components/shared/Experiences";
import Footer from "@/components/shared/FooterSection";
import Hero from "@/components/shared/HeroSection";
import Navigation from "@/components/shared/Navbar";
import Projects from "@/components/shared/Projects";
// import Skills from "@/components/shared/Skills";
import Testimonials from "@/components/shared/Testimonials";
import VariantSkillsComponent from "@/components/variants/VariantSkillsComponent";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      {/* <Skills /> */}
      <VariantSkillsComponent />
      <Projects />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}