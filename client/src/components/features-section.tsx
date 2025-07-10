import { Bot, Shield, TrendingUp, Settings, Headphones, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "24/7 Automated Trading",
    description: "Never miss a trading opportunity. Our bot monitors markets around the clock and executes trades based on proven strategies.",
    color: "bg-trading-primary"
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Advanced risk management features including stop-loss, take-profit, and position sizing to protect your capital.",
    color: "bg-trading-accent"
  },
  {
    icon: TrendingUp,
    title: "Proven Strategies",
    description: "Backtested strategies with documented performance history and consistent profitability across different market conditions.",
    color: "bg-trading-secondary"
  },
  {
    icon: Settings,
    title: "Easy Setup",
    description: "Simple installation process with full setup support. Get your bot running in minutes with our step-by-step guide.",
    color: "bg-yellow-500"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated support team and AI assistant available around the clock to help with any questions or issues.",
    color: "bg-purple-600"
  },
  {
    icon: RefreshCw,
    title: "Regular Updates",
    description: "Continuous optimization and updates to adapt to changing market conditions and improve performance.",
    color: "bg-red-600"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our MT4 Trading Bot?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our Expert Advisor combines advanced algorithms with proven trading strategies to deliver consistent results in the forex market.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-slate-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                  <IconComponent className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
