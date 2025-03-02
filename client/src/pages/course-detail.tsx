
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Course } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Check, 
  Clock, 
  Code, 
  GraduationCap, 
  Laptop, 
  Shield, 
  Users, 
  ChevronRight, 
  Star,
  CheckCircle2
} from "lucide-react";
import CheckoutDialog from "@/components/checkout-dialog";
import { useState } from "react";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [showCheckout, setShowCheckout] = useState(false);

  const { data: course, isLoading } = useQuery<Course>({
    queryKey: [`/api/courses/${courseId}`]
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background animate-pulse">
        <div className="h-96 bg-muted" />
      </div>
    );
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  const curriculum = [
    {
      title: "Getting Started",
      description: "Learn the fundamentals and set up your development environment",
      lessons: [
        "Introduction to the Course",
        "Setting Up Your Development Environment",
        "Understanding the Tech Stack",
        "Building Your First Project"
      ]
    },
    {
      title: "Core Concepts",
      description: "Master the essential concepts and patterns",
      lessons: [
        "Building Your First Component",
        "State Management Deep Dive",
        "Working with APIs",
        "Authentication and Authorization"
      ]
    },
    {
      title: "Advanced Topics",
      description: "Take your skills to the next level",
      lessons: [
        "Advanced State Management",
        "Performance Optimization",
        "Testing Strategies",
        "Deployment Best Practices"
      ]
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "Lifetime Access",
      description: "Learn at your own pace with unlimited access to all course content"
    },
    {
      icon: Code,
      title: "Project-Based Learning",
      description: "Build real-world projects to add to your portfolio"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join our active Discord community of students and developers"
    },
    {
      icon: Shield,
      title: "30-Day Guarantee",
      description: "Not satisfied? Get a full refund within 30 days"
    }
  ];

  const testimonials = [
    {
      name: "Arjun Sharma",
      role: "Front-end Developer",
      text: "This course was a game-changer for my career. I was struggling with advanced concepts, but the explanations were so clear that I finally had those 'aha' moments.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "CS Student",
      text: "As a student, I was looking for practical education beyond what my university offered. This course delivered exactly that with real-world projects.",
      rating: 5
    },
    {
      name: "Rahul Gupta",
      role: "Software Engineer",
      text: "Even as an experienced developer, I learned so many new techniques and best practices. The instructor's attention to detail is impressive.",
      rating: 4
    }
  ];

  const whatYouWillLearn = [
    "Build fully-functional web applications from scratch",
    "Master modern JavaScript, React, and backend technologies",
    "Implement authentication, payment processing, and database operations",
    "Deploy applications to production with CI/CD pipelines",
    "Optimize performance and handle security considerations",
    "Create responsive designs that work on all devices"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Gradient Background */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
                {course.price > 10000 ? "Bestseller" : "New Course"}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {course.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {course.description}
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>40+ hours of video content</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  <span>15+ hands-on projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Join 1000+ successful students</span>
                </div>
              </div>
              <div className="flex gap-4 flex-wrap">
                <Button size="lg" onClick={() => setShowCheckout(true)}>
                  Enroll Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => {
                  document.querySelector("#curriculum")?.scrollIntoView({ behavior: "smooth" });
                }}>
                  View Curriculum
                </Button>
              </div>
            </div>
            <div className="relative">
              <Card className="overflow-hidden border-2 border-primary/20 shadow-xl">
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-bold z-10">
                  {Number(course.price) > 8000 ? "20% OFF" : "10% OFF"}
                </div>
                <CardContent className="p-0">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">200+ reviews</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Price</span>
                        <div>
                          <span className="text-xl font-bold">₹{Number(course.price).toLocaleString('en-IN')}</span>
                          <span className="text-muted-foreground line-through ml-2">₹{Math.round(Number(course.price) * 1.2).toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                      <Button size="lg" className="w-full" onClick={() => setShowCheckout(true)}>
                        Enroll Now
                      </Button>
                      <p className="text-sm text-center text-muted-foreground">
                        30-day money-back guarantee
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whatYouWillLearn.map((item, index) => (
              <div key={index} className="flex gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section id="curriculum" className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Course Curriculum
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            This comprehensive curriculum is designed to take you from beginner to professional level. 
            Each section builds on the previous one, ensuring a smooth learning experience.
          </p>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="bg-white shadow-md rounded-lg overflow-hidden">
              {curriculum.map((section, index) => (
                <AccordionItem key={index} value={`section-${index}`} className="border-b last:border-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/30">
                    <div className="text-left">
                      <h3 className="text-lg font-semibold">{section.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <ul className="space-y-3 pl-6">
                      {section.lessons.map((lesson, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Course Features
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We've designed this course to provide you with the best learning experience possible.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="overflow-hidden border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6">
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1740&auto=format&fit=crop"
                alt="Course Instructor"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-lg">
                <GraduationCap className="h-12 w-12" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Meet Your Instructor</h2>
              <h3 className="text-xl font-medium text-primary mb-4">Dr. Rajesh Verma</h3>
              <p className="text-muted-foreground mb-6">
                With over 10 years of industry experience at top tech companies and 7+ years of teaching,
                Dr. Verma has helped thousands of students launch their careers in tech.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Lead Developer at Microsoft for 5 years</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>PhD in Computer Science</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Author of 3 programming books</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>International conference speaker</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            What Our Students Say
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our students have to say about the course.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} 
                      />
                    ))}
                  </div>
                  <p className="mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="bg-white shadow-md rounded-lg overflow-hidden">
              <AccordionItem value="faq-1" className="border-b">
                <AccordionTrigger className="px-6 py-4">
                  Do I need prior programming experience?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  No, this course is designed for beginners. We start with the basics and gradually move to more advanced topics.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2" className="border-b">
                <AccordionTrigger className="px-6 py-4">
                  How long do I have access to the course?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  You'll have lifetime access to all course materials, including future updates.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3" className="border-b">
                <AccordionTrigger className="px-6 py-4">
                  Is there a certificate of completion?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Yes, upon completing the course, you'll receive a certificate that you can add to your resume or LinkedIn profile.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4" className="border-b">
                <AccordionTrigger className="px-6 py-4">
                  What if I'm not satisfied with the course?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  We offer a 30-day money-back guarantee. If you're not satisfied, just let us know and we'll process your refund.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5" className="border-b">
                <AccordionTrigger className="px-6 py-4">
                  Will I get support if I have questions?
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  Absolutely! You'll have access to our private Discord community where you can ask questions and get help from the instructor and other students.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who have transformed their careers 
            with this comprehensive course.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            onClick={() => setShowCheckout(true)}
            className="bg-white text-primary hover:bg-white/90"
          >
            Enroll Now for ₹{Number(course.price).toLocaleString('en-IN')}
          </Button>
          <p className="text-sm opacity-80 mt-4">
            30-day money-back guarantee. No questions asked.
          </p>
        </div>
      </section>

      <CheckoutDialog
        course={course}
        open={showCheckout}
        onOpenChange={setShowCheckout}
      />
    </div>
  );
}
