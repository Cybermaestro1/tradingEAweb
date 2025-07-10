import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-trading-primary">PIP BLASTER</h1>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-900 hover:text-trading-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-600 hover:text-trading-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("proof")}
                className="text-gray-600 hover:text-trading-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Proof Gallery
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-gray-600 hover:text-trading-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Reviews
              </button>
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-trading-primary text-white hover:bg-blue-800 transition-colors"
              >
                Contact Team
              </Button>
            </div>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-trading-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-900 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-600 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("proof")}
              className="text-gray-600 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Proof Gallery
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-gray-600 block px-3 py-2 text-base font-medium w-full text-left"
            >
              Reviews
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-trading-primary text-white mx-3 w-auto"
            >
              Contact Team
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
