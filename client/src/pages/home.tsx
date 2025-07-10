import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import ProofGallerySection from "@/components/proof-gallery-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import AiChatWidget from "@/components/ai-chat-widget";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ProofGallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <AiChatWidget />
    </div>
  );
}
