import { 
  waitlistEntries, type WaitlistEntry, type InsertWaitlistEntry,
  courses, type Course, type InsertCourse,
  orders, type Order, type InsertOrder 
} from "@shared/schema";

export interface IStorage {
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;

  // Course methods
  createCourse(course: InsertCourse): Promise<Course>;
  getCourse(id: number): Promise<Course | undefined>;
  getAllCourses(): Promise<Course[]>;

  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
  getOrderByStripeSession(sessionId: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private waitlist: Map<number, WaitlistEntry>;
  private courseList: Map<number, Course>;
  private orderList: Map<number, Order>;
  private currentId: number;

  constructor() {
    this.waitlist = new Map();
    this.courseList = new Map();
    this.orderList = new Map();
    this.currentId = 1;

    // Add some sample courses
    this.initializeSampleCourses();
  }

  private async initializeSampleCourses() {
    const sampleCourses: InsertCourse[] = [
      {
        title: "Complete Web Development Bootcamp",
        description: "Learn full-stack web development from scratch. Includes React, Node.js, and MongoDB.",
        price: "14999",
        imageUrl: "/images/web-dev.jpg"
      },
      {
        title: "Advanced Data Structures in Python",
        description: "Master complex algorithms and data structures. Perfect for coding interviews.",
        price: "9999",
        imageUrl: "/images/dsa.jpg"
      },
      {
        title: "Mobile App Development with Flutter",
        description: "Build cross-platform mobile apps for Android and iOS using Flutter.",
        price: "12999",
        imageUrl: "/images/flutter.jpg"
      }
    ];

    for (const course of sampleCourses) {
      await this.createCourse(course);
    }
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    return Array.from(this.waitlist.values()).find(
      (entry) => entry.email === email
    );
  }

  async createWaitlistEntry(insertEntry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const id = this.currentId++;
    const entry: WaitlistEntry = {
      id,
      email: insertEntry.email,
      createdAt: new Date()
    };
    this.waitlist.set(id, entry);
    return entry;
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentId++;
    const course: Course = {
      ...insertCourse,
      id,
      createdAt: new Date()
    };
    this.courseList.set(id, course);
    return course;
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courseList.get(id);
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courseList.values());
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentId++;
    const order: Order = {
      ...insertOrder,
      id,
      status: "pending",
      createdAt: new Date()
    };
    this.orderList.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orderList.get(id);
  }

  async getOrderByStripeSession(sessionId: string): Promise<Order | undefined> {
    return Array.from(this.orderList.values()).find(
      (order) => order.stripeSessionId === sessionId
    );
  }
}

export const storage = new MemStorage();