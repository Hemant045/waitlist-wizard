import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Course } from "@shared/schema";

export default function CourseList() {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"]
  });

  if (isLoading) {
    return (
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Courses</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted"></div>
              <CardContent className="p-6">
                <div className="h-6 bg-muted rounded mb-4"></div>
                <div className="h-20 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Transform Your Career with Our Courses</h2>
        <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
          Join thousands of successful students who have mastered in-demand skills through our comprehensive courses.
        </p>
        <div className="grid lg:grid-cols-3 gap-8">
          {courses?.map((course) => (
            <Card key={course.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 card-glow group hover-lift">
              <div className="relative">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
                <p className="text-muted-foreground mb-6">{course.description}</p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>50+ hours of content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <span>20+ hands-on projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Community support</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-3xl font-bold">₹{Number(course.price).toLocaleString('en-IN')}</p>
                    <p className="text-sm text-muted-foreground">One-time payment</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm line-through text-muted-foreground">₹{(Number(course.price) * 2).toLocaleString('en-IN')}</p>
                    <p className="text-sm text-green-600 font-medium">50% off</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button 
                  className="w-full text-lg h-12 group" 
                  asChild
                >
                  <Link href={`/courses/${course.title.toLowerCase().replace(/ /g, '-')}`}>
                    Enroll Now <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}