import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema, insertOrderSchema } from "@shared/schema";
import { ZodError } from "zod";
import { createPaymentSession } from "./stripe";

export async function registerRoutes(app: Express) {
  // Waitlist route
  app.post("/api/waitlist", async (req, res) => {
    try {
      const data = insertWaitlistSchema.parse(req.body);

      const existing = await storage.getWaitlistEntryByEmail(data.email);
      if (existing) {
        return res.status(400).json({ 
          message: "This email is already on the waitlist" 
        });
      }

      const entry = await storage.createWaitlistEntry(data);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: error.errors[0].message 
        });
      }
      throw error;
    }
  });

  // Course routes
  app.get("/api/courses", async (_req, res) => {
    const courses = await storage.getAllCourses();
    res.json(courses);
  });

  app.get("/api/courses/:id", async (req, res) => {
    const course = await storage.getCourse(Number(req.params.id));
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  });

  // Payment routes
  app.post("/api/checkout", async (req, res) => {
    try {
      const data = insertOrderSchema.parse(req.body);
      const course = await storage.getCourse(data.courseId);

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const sessionId = await createPaymentSession(
        course.id,
        course.title,
        Number(course.price),
        data.email
      );

      const order = await storage.createOrder({
        ...data,
        stripeSessionId: sessionId,
        status: "pending"
      });

      res.json({ sessionId, orderId: order.id });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      throw error;
    }
  });

  return createServer(app);
}