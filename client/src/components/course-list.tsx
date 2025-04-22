import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Star, 
  ChevronRight, 
  PlayCircle,
  Layers,
  GraduationCap,
  CheckCircle2 
} from "lucide-react";
import { type Course } from "@shared/schema";

export default function CourseList() {
  const { data: courses } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const activeCourses = courses?.length ? courses : [];

  return (
    <section>
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-16 border-y">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-primary font-medium">LEARN WITH COURSEOVA</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Premium Courses to Advance Your Career</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students who have transformed their careers with our industry-ready courses
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="overflow-x-auto mb-12">
          <div className="flex space-x-2 min-w-max p-1 mb-8 border rounded-lg bg-muted/20 justify-center mx-auto max-w-xl">
            <Button variant="ghost" className="rounded-md font-medium px-6 py-2 bg-background shadow">All Courses</Button>
            <Button variant="ghost" className="rounded-md font-medium px-6 py-2">Web Development</Button>
            <Button variant="ghost" className="rounded-md font-medium px-6 py-2">Mobile Development</Button>
            <Button variant="ghost" className="rounded-md font-medium px-6 py-2">Data Structures</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all">
              <div className="relative">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className="flex items-center gap-1 bg-muted/30 px-3 py-1 rounded-full text-sm">
                      <PlayCircle className="h-4 w-4 text-primary" />
                      <span>40+ lectures</span>
                    </div>
                    <div className="flex items-center gap-1 bg-muted/30 px-3 py-1 rounded-full text-sm">
                      <Layers className="h-4 w-4 text-primary" />
                      <span>15+ projects</span>
                    </div>
                    <div className="flex items-center gap-1 bg-muted/30 px-3 py-1 rounded-full text-sm">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span>Beginner</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {["Complete Course Material", "Lifetime Access", "Certificate"].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">(120+ reviews)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-2xl font-bold">₹{Number(course.price).toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  <Button 
                    className="h-10" 
                    asChild
                  >
                    <Link href={`/courses/${course.id}`}>
                      View Course
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="rounded-full">
            View All Courses <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}