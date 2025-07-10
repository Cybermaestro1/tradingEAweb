import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { SiTelegram } from "react-icons/si";

const socialLinks = [
  { icon: Facebook, href: "#", className: "bg-blue-600 hover:bg-blue-700" },
  { icon: Linkedin, href: "#", className: "bg-blue-700 hover:bg-blue-800" },
  { icon: Instagram, href: "#", className: "bg-pink-600 hover:bg-pink-700" },
  { icon: Youtube, href: "#", className: "bg-red-600 hover:bg-red-700" },
];

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "Proof Gallery", href: "#proof" },
  { name: "Reviews", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

const supportLinks = [
  { name: "Documentation", href: "#" },
  { name: "Setup Guide", href: "#" },
  { name: "FAQ", href: "#" },
  { name: "Live Chat", href: "#" },
  { name: "Terms of Service", href: "#" },
];

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">PIP BLASTER</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Professional MT4 Expert Advisor for automated forex trading. Join thousands of successful traders using our proven strategies.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${social.className}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
              <a
                href="#"
                className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center transition-colors"
              >
                <SiTelegram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-white transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">© 2024 PIP BLASTER. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Terms of Use</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
