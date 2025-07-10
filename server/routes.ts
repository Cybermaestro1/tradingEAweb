import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReviewSchema, insertContactSchema } from "@shared/schema";
import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all reviews
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  // Create a new review
  app.post("/api/reviews", async (req, res) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(validatedData);
      res.status(201).json(review);
    } catch (error) {
      if (error.name === "ZodError") {
        res.status(400).json({ message: "Invalid review data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create review" });
      }
    }
  });

  // Create contact submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContactSubmission(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      if (error.name === "ZodError") {
        res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to submit contact form" });
      }
    }
  });

  // AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== "string") {
        return res.status(400).json({ message: "Message is required" });
      }

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an AI assistant for PIP BLASTER, a professional MT4 Expert Advisor trading bot service. Help users with questions about automated forex trading, our bot features, setup process, and trading strategies. Be helpful, professional, and knowledgeable about forex trading. Keep responses concise and relevant to trading bots and forex."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 200,
        temperature: 0.7,
      });

      const aiResponse = response.choices[0].message.content;
      res.json({ response: aiResponse });
    } catch (error) {
      console.error("OpenAI API error:", error);
      res.status(500).json({ 
        response: "I'm sorry, I'm having trouble processing your request right now. Please try again later or contact our support team directly." 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
