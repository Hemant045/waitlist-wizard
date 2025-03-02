import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Course } from "@shared/schema";
import { useState } from "react";
import CheckoutDialog from "./checkout-dialog";

export default function CourseList() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
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
      <h2 className="text-3xl font-bold text-center mb-12">Our Courses</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {courses?.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <img
              src={course.imageUrl}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-muted-foreground mb-4">{course.description}</p>
              <p className="text-2xl font-bold">₹{Number(course.price).toLocaleString('en-IN')}</p>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Button 
                className="w-full" 
                onClick={() => setSelectedCourse(course)}
              >
                Enroll Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <CheckoutDialog
        course={selectedCourse}
        open={!!selectedCourse}
        onOpenChange={(open) => !open && setSelectedCourse(null)}
      />
    </section>
  );
}
