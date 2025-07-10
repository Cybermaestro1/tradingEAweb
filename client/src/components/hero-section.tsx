import { Button } from "@/components/ui/button";
import { Rocket, Play, TrendingUp } from "lucide-react";

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-trading-primary to-trading-secondary text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-trading-accent">AUTOMATE YOUR TRADING</span>
            </h1>
            <p className="text-xl mb-8 text-blue-300 leading-relaxed">
              Maximize your trading potential with our advanced Expert Advisor. Proven strategies, 24/7 automation, and consistent profits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact}
                className="bg-trading-accent text-black px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                size="lg"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Get Started Now
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-trading-primary transition-colors"
                size="lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Professional trading dashboard" 
              className="rounded-xl shadow-2xl w-full h-auto" 
            />
            <div className="absolute -top-4 -right-4 bg-trading-accent text-white px-4 py-2 rounded-lg font-semibold">
              <TrendingUp className="inline mr-2 h-4 w-4" />
              Live Trading
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
