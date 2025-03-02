import { useQuery } from "@tanstack/react-query";
import { type Course } from "@shared/schema";
import CourseList from "@/components/course-list";

export default function Courses() {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"]
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Our Courses</h1>
      <CourseList />
    </main>
  );
}
