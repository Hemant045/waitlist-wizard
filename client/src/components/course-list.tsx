
import { useQuery } from "@tanstack/react-query";
import { type Course } from "@shared/schema";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, Star } from "lucide-react";

export default function CourseList() {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"]
  });

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-64 bg-muted"/>
                <CardContent className="p-6">
                  <div className="h-6 bg-muted rounded w-3/4 mb-4"/>
                  <div className="h-4 bg-muted rounded w-full mb-2"/>
                  <div className="h-4 bg-muted rounded w-2/3"/>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20" id="course-list">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Premium Courses</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Master in-demand skills with our comprehensive courses designed for Indian developers
        </p>
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {courses?.map((course) => (
            <Card key={course.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="grid md:grid-cols-2">
                <div className="relative">
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {Number(course.price) > 8000 && (
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      Bestseller
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{course.title}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">(200+ reviews)</span>
                  </div>
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      <span>40+ hours of video content</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Certificate of completion</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      <span>Lifetime access</span>
                    </li>
                  </ul>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">₹{Number(course.price).toLocaleString('en-IN')}</p>
                        <p className="text-sm text-muted-foreground">
                          <span className="line-through">₹{Math.round(Number(course.price) * 1.2).toLocaleString('en-IN')}</span>
                          {" "}(20% off)
                        </p>
                      </div>
                    </div>
                    <Button className="w-full" size="lg" asChild>
                      <Link href={`/courses/${course.id}`}>
                        View Course
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
