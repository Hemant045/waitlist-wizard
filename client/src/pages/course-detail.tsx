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
  CheckCircle2,
  BookOpen,
  Timer,
  Video,
  FileText,
  MessageSquare,
  Globe,
  Building,
  Medal
} from "lucide-react";
import CheckoutDialog from "@/components/checkout-dialog";
import { useState } from "react";

export default function CourseDetail() {
  const { courseId } = useParams();
  const [showCheckout, setShowCheckout] = useState(false);

  const { data: course, isLoading } = useQuery<Course>({
    queryKey: [`/api/courses/${courseId}`],
    enabled: !!courseId
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
      title: "Introduction to the Course",
      lessons: [
        "Course Overview and Setup",
        "Understanding the Learning Path",
        "Required Tools and Software",
        "Setting Up Your Development Environment"
      ]
    },
    {
      title: "Core Concepts",
      lessons: [
        "Fundamentals of Web Development",
        "Building Your First Project",
        "Working with APIs",
        "Modern Development Practices"
      ]
    },
    {
      title: "Advanced Topics",
      lessons: [
        "Real-world Project Implementation",
        "Performance Optimization",
        "Security Best Practices",
        "Deployment and Scaling"
      ]
    }
  ];

  const benefits = [
    {
      icon: Video,
      title: "High-Quality Video Content",
      description: "Crystal clear video lectures with detailed explanations"
    },
    {
      icon: FileText,
      title: "Comprehensive Notes",
      description: "Detailed course notes and documentation"
    },
    {
      icon: MessageSquare,
      title: "Discord Community",
      description: "Access to exclusive student community"
    },
    {
      icon: Globe,
      title: "Lifetime Access",
      description: "Learn at your own pace with unlimited access"
    },
    {
      icon: Building,
      title: "Industry Projects",
      description: "Real-world projects for your portfolio"
    },
    {
      icon: Medal,
      title: "Completion Certificate",
      description: "Earn a certificate upon completion"
    }
  ];

  // Add course details based on course ID
  const courseDetails = {
    'web-development': {
      highlights: [
        { icon: Code, text: "Full Stack Development with MERN Stack" },
        { icon: Laptop, text: "Modern Frontend Frameworks & Libraries" },
        { icon: Shield, text: "Backend Security & Authentication" },
        { icon: Building, text: "Real-world Architecture & Best Practices" }
      ],
      features: [
        "Complete Guide from Basics to Advanced",
        "Build 20+ Real World Projects",
        "Industry Standard Best Practices",
        "Database Design & Management",
        "API Development & Integration",
        "Deployment & DevOps Basics"
      ]
    },
    'data-structures': {
      highlights: [
        { icon: Code, text: "Comprehensive DSA Coverage" },
        { icon: Laptop, text: "Problem Solving Techniques" },
        { icon: Shield, text: "Interview Preparation" },
        { icon: Building, text: "System Design Basics" }
      ],
      features: [
        "All Important Data Structures",
        "Algorithm Analysis & Design",
        "200+ Coding Problems",
        "Interview Patterns",
        "Memory Management",
        "Time & Space Complexity"
      ]
    }
  };

  const details = courseDetails[courseId as keyof typeof courseDetails];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full">
                  <Medal className="h-4 w-4" />
                  <span className="text-sm font-medium">Bestseller Course</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold">{course.title}</h1>
                <p className="text-xl text-muted-foreground">{course.description}</p>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Timer className="h-5 w-5 text-primary" />
                    <span>50+ Hours Content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span>20+ Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span>Certificate Included</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-3xl font-bold">₹{Number(course.price).toLocaleString('en-IN')}</p>
                    <p className="text-sm text-muted-foreground">One-time payment, lifetime access</p>
                  </div>
                  <Button size="lg" onClick={() => setShowCheckout(true)}>
                    Enroll Now
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="overflow-hidden">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full aspect-video object-cover"
                />
                <CardContent className="p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">500+ students enrolled</span>
                  </div>

                  {details && details.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <highlight.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span>{highlight.text}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1 mb-6 text-sm font-medium bg-primary/10 text-primary rounded-full">
                {courseId === 'web-development' ? 'Web Development' : 
                 courseId === 'data-structures' ? 'Data Structures & Algorithms' : 
                 'Mobile Development'}
              </div>
              <h1 className="text-4xl font-bold mb-6">{course.title}</h1>
              <p className="text-xl text-muted-foreground mb-8">{course.description}</p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-primary" />
                  <span>40+ hours content</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Course materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span>Lifetime access</span>
                </div>
              </div>
              <div className="flex gap-4">
                <Button size="lg" onClick={() => setShowCheckout(true)}>
                  Enroll Now - ₹{Number(course.price).toLocaleString('en-IN')}
                </Button>
                <Button size="lg" variant="outline">
                  View Curriculum
                </Button>
              </div>
            </div>
            <div>
              <Card className="overflow-hidden">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full aspect-video object-cover"
                />
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(i => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">200+ reviews</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Timer className="h-5 w-5 text-primary" />
                        <span>Course Duration: 3 months</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <span>15+ Projects Included</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span>1000+ Students Enrolled</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What You'll Learn</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Master these in-demand skills and boost your career opportunities
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {details && details.features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">{feature}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">What You'll Get</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Everything you need to succeed in your learning journey
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <benefit.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Course Curriculum */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Course Curriculum</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="bg-background rounded-lg shadow-lg">
              {curriculum.map((section, index) => (
                <AccordionItem key={index} value={`section-${index}`} className="border-b last:border-0">
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/30">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-semibold">{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <ul className="space-y-3">
                      {section.lessons.map((lesson, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Video className="h-4 w-4 text-primary" />
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
      <section className="py-20 bg-primary text-white">
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