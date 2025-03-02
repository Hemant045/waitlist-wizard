import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type Course } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Code, GraduationCap, Laptop, Users } from "lucide-react";

export default function CourseDetail() {
  const { courseId } = useParams();
  
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

  const features = [
    {
      icon: Clock,
      title: "Lifetime Access",
      description: "Learn at your own pace with unlimited access"
    },
    {
      icon: Code,
      title: "Project-Based Learning",
      description: "Build real-world projects for your portfolio"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join our active student community"
    },
    {
      icon: Laptop,
      title: "Live Coding Sessions",
      description: "Weekly live sessions with instructors"
    }
  ];

  const curriculum = [
    {
      title: "Getting Started",
      lessons: [
        "Course Introduction",
        "Setting Up Your Development Environment",
        "Understanding the Tech Stack"
      ]
    },
    {
      title: "Core Concepts",
      lessons: [
        "Building Your First Component",
        "State Management Deep Dive",
        "Working with APIs"
      ]
    },
    // Add more sections based on course content
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
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>Comprehensive curriculum with practical projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>40+ hours of video content</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Join 1000+ successful students</span>
                </div>
              </div>
            </div>
            <div>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold">₹{Number(course.price).toLocaleString('en-IN')}</p>
                    <p className="text-muted-foreground">One-time payment</p>
                  </div>
                  <Button className="w-full text-lg" size="lg">
                    Enroll Now
                  </Button>
                  <p className="text-sm text-center text-muted-foreground mt-4">
                    30-day money-back guarantee
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What You'll Get
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

      {/* Curriculum Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Course Curriculum
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {curriculum.map((section, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.lessons.map((lesson, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
