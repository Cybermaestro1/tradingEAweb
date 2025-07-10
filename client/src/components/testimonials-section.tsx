import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Review } from "@shared/schema";

const defaultTestimonials = [
  {
    id: 1,
    name: "Michael Chen",
    email: "michael@example.com",
    rating: 5,
    comment: "This EA bot has completely transformed my trading. I've seen consistent profits every month, and the automated risk management gives me peace of mind.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
    title: "Professional Trader"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    rating: 5,
    comment: "Amazing support team and the bot works exactly as advertised. Setup was easy and I started seeing profits within the first week.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
    title: "Investment Manager"
  },
  {
    id: 3,
    name: "David Rodriguez",
    email: "david@example.com",
    rating: 5,
    comment: "Best trading investment I've made. The bot runs 24/7 and I can monitor everything from my phone. Highly recommend!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64",
    title: "Financial Advisor"
  }
];

export default function TestimonialsSection() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ["/api/reviews"],
  });

  const createReviewMutation = useMutation({
    mutationFn: async (data: { name: string; email: string; rating: number; comment: string }) => {
      const response = await apiRequest("POST", "/api/reviews", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      setName("");
      setEmail("");
      setComment("");
      setRating(0);
      toast({
        title: "Review submitted successfully!",
        description: "Thank you for your feedback. It will be published after moderation.",
      });
    },
    onError: () => {
      toast({
        title: "Error submitting review",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Rating is required to submit your review.",
        variant: "destructive",
      });
      return;
    }
    createReviewMutation.mutate({ name, email, rating, comment });
  };

  const renderStars = (currentRating: number, interactive: boolean = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < currentRating
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
        onClick={interactive ? () => setRating(i + 1) : undefined}
      />
    ));
  };

  const allTestimonials = [...defaultTestimonials, ...reviews];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied traders who have transformed their trading with our MT4 Expert Advisor.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {allTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-slate-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="ml-2 text-sm text-gray-600">({testimonial.rating}.0)</span>
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=64&h=64`}
                  alt={`${testimonial.name} testimonial`}
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div className="ml-3">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.title || "Verified Customer"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Review Submission Form */}
        <div className="bg-slate-50 p-8 rounded-xl max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Share Your Experience</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="review-name">Full Name</Label>
                <Input
                  id="review-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="review-email">Email Address</Label>
                <Input
                  id="review-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label>Rating</Label>
              <div className="flex space-x-1 mt-2">
                {renderStars(rating, true)}
              </div>
            </div>
            
            <div>
              <Label htmlFor="review-comment">Your Review</Label>
              <Textarea
                id="review-comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Share your experience with our trading bot..."
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-trading-primary hover:bg-blue-800"
              disabled={createReviewMutation.isPending}
            >
              {createReviewMutation.isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
