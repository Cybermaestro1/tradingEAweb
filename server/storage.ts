import { users, reviews, contactSubmissions, type User, type InsertUser, type Review, type InsertReview, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createReview(review: InsertReview): Promise<Review>;
  getReviews(): Promise<Review[]>;
  
  createContactSubmission(contact: InsertContact): Promise<Contact>;
  getContactSubmissions(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private reviews: Map<number, Review>;
  private contactSubmissions: Map<number, Contact>;
  private currentUserId: number;
  private currentReviewId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.reviews = new Map();
    this.contactSubmissions = new Map();
    this.currentUserId = 1;
    this.currentReviewId = 1;
    this.currentContactId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = {
      ...insertReview,
      id,
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }

  async getReviews(): Promise<Review[]> {
    return Array.from(this.reviews.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createContactSubmission(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contactSubmissions.set(id, contact);
    return contact;
  }

  async getContactSubmissions(): Promise<Contact[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

export const storage = new MemStorage();
