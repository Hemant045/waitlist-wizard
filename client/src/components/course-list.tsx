import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Course } from "@shared/schema";
import { 
  Clock, 
  Code, 
  GraduationCap, 
  Shield, 
  Users, 
  ChevronRight, 
  Star, 
  CheckCircle2, 
  Calendar, 
  Layers,
  PlayCircle,
  Monitor,
  FileText
} from "lucide-react";

export default function CourseList() {
  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"]
  });

  if (isLoading) {
    return (
      <section className="py-12">
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

  // Sample courses similar to Tishant Agrawal's site
  const featuredCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description: "Master HTML, CSS, JavaScript, React, Node.js and MongoDB in this comprehensive course",
      price: 1499,
      originalPrice: 2999,
      discount: 50,
      imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2264&auto=format&fit=crop",
      duration: "50+ hours",
      lectures: 200,
      projects: 15,
      level: "Beginner to Advanced",
      features: [
        "Lifetime access to course content",
        "Certificate of completion",
        "Discord community access",
        "Regular updates with new content",
        "Practical real-world projects"
      ],
      tag: "Bestseller"
    },
    {
      id: 2,
      title: "Data Structures & Algorithms Mastery",
      description: "Ace technical interviews with in-depth coverage of DSA concepts and problem-solving techniques",
      price: 1999,
      originalPrice: 3999,
      discount: 50,
      imageUrl: "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?q=80&w=2340&auto=format&fit=crop",
      duration: "40+ hours",
      lectures: 150,
      projects: 10,
      level: "Intermediate",
      features: [
        "150+ coding problems with solutions",
        "Interview preparation strategies",
        "System design fundamentals",
        "Time & space complexity analysis",
        "Mock interview sessions"
      ],
      tag: "Most Popular"
    },
    {
      id: 3,
      title: "Mobile App Development with React Native",
      description: "Build cross-platform mobile apps for iOS and Android with a single codebase",
      price: 2499,
      originalPrice: 4999,
      discount: 50,
      imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
      duration: "35+ hours",
      lectures: 120,
      projects: 8,
      level: "Intermediate",
      features: [
        "Practical app development examples",
        "Publishing to App Store & Play Store",
        "Native device features integration",
        "State management with Redux",
        "Performance optimization techniques"
      ],
      tag: "New"
    }
  ];

  const activeCourses = courses?.length ? courses : featuredCourses;

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
        {/* Filter tabs - similar to Tishant's page */}
        <div className="overflow-x-auto mb-12">
          <div className="flex space-x-2 min-w-max p-1 mb-8 border rounded-lg bg-muted/20 justify-center mx-auto max-w-xl">
            <Button variant="ghost" className="rounded-md font-medium px-6 py-2 bg-background shadow">All Courses</Button>
            <Button variant="ghost" className="rounded-md font-medium px-6 py-2">Web Development</Button>
            <Button variant="ghost" className="rounded-md font-medium px-6 py-2">Mobile Development</Button>
            <Button variant="ghost" className="rounded-md font-medium px-6 py-2">Data Structures</Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {activeCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden border-2 hover:border-primary/30 transition-all duration-300 flex flex-col lg:flex-row">
              <div className="lg:w-2/5 relative overflow-hidden">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {course.tag && (
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {course.tag}
                  </div>
                )}
              </div>
              
              <div className="lg:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-1 bg-muted/30 px-3 py-1 rounded-full text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-muted/30 px-3 py-1 rounded-full text-sm">
                      <PlayCircle className="h-4 w-4 text-primary" />
                      <span>{course.lectures} lectures</span>
                    </div>
                    <div className="flex items-center gap-1 bg-muted/30 px-3 py-1 rounded-full text-sm">
                      <Layers className="h-4 w-4 text-primary" />
                      <span>{course.projects} projects</span>
                    </div>
                    <div className="flex items-center gap-1 bg-muted/30 px-3 py-1 rounded-full text-sm">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span>{course.level}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {course.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {course.features.length > 3 && (
                      <div className="text-sm text-primary font-medium">
                        +{course.features.length - 3} more features
                      </div>
                    )}
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
                      <p className="text-sm line-through text-muted-foreground">₹{Number(course.originalPrice).toLocaleString('en-IN')}</p>
                      <p className="text-sm text-green-600 font-medium">{course.discount}% off</p>
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
      
      {/* Why Choose Us Section */}
      <div className="bg-muted/20 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Courses?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our courses are designed to provide you with the most comprehensive learning experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-primary/20 p-6">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Monitor className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Industry-Relevant Content</h3>
              <p className="text-muted-foreground">
                Our courses are regularly updated to keep pace with the latest industry trends and technologies
              </p>
            </Card>
            
            <Card className="border border-primary/20 p-6">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Practical Projects</h3>
              <p className="text-muted-foreground">
                Build real-world projects that you can showcase in your portfolio and to potential employers
              </p>
            </Card>
            
            <Card className="border border-primary/20 p-6">
              <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Support</h3>
              <p className="text-muted-foreground">
                Join our thriving community of learners to network, collaborate, and grow together
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}