import { Button } from "@/components/ui/button";
import { Play, BarChart3, ArrowRightLeft, Settings, Shield } from "lucide-react";

const stats = [
  { value: "94.7%", label: "Win Rate" },
  { value: "59,847", label: "Total Trades" },
  { value: "+$827K", label: "Total Profit" },
  { value: "18", label: "Months Active" }
];

const galleryItems = [
  
  {
    image: "https://images.unsplash.com/photo-1642790551116-18e150f248e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    title: "Live Trading Session",
    description: "Real-time bot execution and trade management",
    icon: Play,
    action: "Watch Live Demo"
  },
  {
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    title: "Performance Analytics",
    description: "Detailed analysis of trading patterns and results",
    icon: BarChart3,
    action: "View Report"
  },
  {
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
    title: "Risk Management",
    description: "Advanced risk controls and position sizing",
    icon: Shield,
    
  }
];

export default function ProofGallerySection() {
  return (
    <section id="proof" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Proven Results & Performance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See real trading results, performance metrics, and testimonials from our satisfied clients.
          </p>
        </div>
        
        {/* Performance Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl text-center shadow-sm">
              <div className="text-3xl font-bold text-trading-accent mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <Button 
                    variant="ghost" 
                    className="text-trading-primary hover:text-trading-secondary font-medium text-sm p-0 h-auto"
                  >
                    <IconComponent className="mr-1 h-4 w-4" />
                    {item.action}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
