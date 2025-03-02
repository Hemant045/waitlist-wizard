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
import { Check, Clock, Code, GraduationCap, Laptop, Shield, Users } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-primary/5 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-6">{course.title}</h1>
              <p className="text-xl text-muted-foreground mb-8">
                {course.description}
              </p>
              <div className="space-y-4">
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
            </div>
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <p className="text-3xl font-bold">₹{Number(course.price).toLocaleString('en-IN')}</p>
                      <div className="px-2 py-1 bg-primary/10 text-primary text-sm rounded">
                        Limited Time Offer
                      </div>
                    </div>
                    <p className="text-muted-foreground">One-time payment</p>
                  </div>
                  <Button 
                    className="w-full text-lg mb-4" 
                    size="lg"
                    onClick={() => setShowCheckout(true)}
                  >
                    Enroll Now
                  </Button>
                  <div className="text-sm text-center text-muted-foreground">
                    <Shield className="h-4 w-4 inline mr-1" />
                    30-day money-back guarantee
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p>Build complete web applications from scratch</p>
              </div>
              <div className="flex gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p>Master modern JavaScript and framework concepts</p>
              </div>
              <div className="flex gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p>Implement authentication and authorization</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p>Deploy applications to production</p>
              </div>
              <div className="flex gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p>Write clean, maintainable code</p>
              </div>
              <div className="flex gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <p>Build a portfolio of real-world projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Course Curriculum
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {curriculum.map((section, index) => (
                <AccordionItem key={index} value={`section-${index}`}>
                  <AccordionTrigger>
                    <div>
                      <h3 className="text-lg font-semibold">{section.title}</h3>
                      <p className="text-sm text-muted-foreground text-left">
                        {section.description}
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
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
          <h2 className="text-3xl font-bold text-center mb-12">
            Course Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
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
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Your Instructor
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6">
              <img
                src="/images/instructor.jpg"
                alt="Instructor"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-2">John Doe</h3>
            <p className="text-muted-foreground mb-6">
              Senior Software Engineer with 10+ years of experience
            </p>
            <p className="text-muted-foreground">
              I've helped thousands of students master web development and land their dream jobs. 
              My teaching approach focuses on practical, real-world applications that will help you 
              become a confident developer.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who have transformed their careers 
            with this comprehensive course.
          </p>
          <Button size="lg" onClick={() => setShowCheckout(true)}>
            Enroll Now for ₹{Number(course.price).toLocaleString('en-IN')}
          </Button>
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