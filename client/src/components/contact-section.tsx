import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Phone, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import BotActivationForm from "@/components/BotActivationForm";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    experience: "",
    accountSize: "",
    requirements: "",
    acceptTerms: false,
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          experience: data.experience,
          accountSize: data.accountSize,
          message: data.requirements, // or combine all fields
        }),
      });

      return response.json();
    },
    onSuccess: () => {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        experience: "",
        accountSize: "",
        requirements: "",
        acceptTerms: false,
      });
      toast({
        title: "Request submitted successfully!",
        description: "Our team will contact you within 24 hours.",
      });
    },
    onError: () => {
      toast({
        title: "Error submitting request",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      toast({
        title: "Please accept terms",
        description: "You must accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }
    contactMutation.mutate(formData);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Contact Our Team for Activation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your automated trading journey? Get in touch with our
            team to activate your MT4 Expert Advisor.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Request Activation
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <Label htmlFor="experience">Trading Experience</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("experience", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">
                      Beginner (0-1 years)
                    </SelectItem>
                    <SelectItem value="intermediate">
                      Intermediate (1-3 years)
                    </SelectItem>
                    <SelectItem value="advanced">
                      Advanced (3-5 years)
                    </SelectItem>
                    <SelectItem value="expert">Expert (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="accountSize">Account Size</Label>
                <Select
                  onValueChange={(value) =>
                    handleInputChange("accountSize", value)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your account size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">$200 - $5,000</SelectItem>
                    <SelectItem value="medium">$5,000 - $25,000</SelectItem>
                    <SelectItem value="large">$25,000 - $100,000</SelectItem>
                    <SelectItem value="institutional">$100,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="requirements">
                  What do you need help with?
                </Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) =>
                    handleInputChange("requirements", e.target.value)
                  }
                  rows={4}
                  placeholder="Please describe your specific needs, questions, or requirements for the trading bot activation..."
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("acceptTerms", checked as boolean)
                  }
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-trading-primary hover:text-trading-secondary"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-trading-primary hover:text-trading-secondary"
                  >
                    Privacy Policy
                  </a>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-trading-primary hover:bg-blue-800"
                disabled={contactMutation.isPending}
              >
                <Send className="mr-2 h-4 w-4" />
                {contactMutation.isPending
                  ? "Submitting..."
                  : "Request Activation"}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Get In Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-trading-primary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="text-white h-4 w-4" />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-600">admin@pipblaster.xyz</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-trading-accent rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="text-white h-4 w-4" />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">Phone</div>
                    <div className="text-gray-600">+971 50 412 6695</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-8 h-8 bg-trading-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="text-white h-4 w-4" />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">
                      Support Hours
                    </div>
                    <div className="text-gray-600">24/7 Available</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Photo */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Expert Team
              </h3>
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=300"
                alt="Professional trading team"
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600">
                Our experienced team of traders and developers is here to
                support your success with personalized guidance and technical
                expertise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
