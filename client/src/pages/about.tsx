import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, Trophy, Target } from "lucide-react";

export default function About() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Transform Your Career with Expert-Led Courses
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Join thousands of successful students who have advanced their careers through our comprehensive courses.
        </p>
        <Button size="lg" asChild>
          <a href="/courses">Browse Courses</a>
        </Button>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card>
          <CardContent className="pt-6">
            <GraduationCap className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p className="text-muted-foreground">Learn from industry professionals with years of experience</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Users className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Community Support</h3>
            <p className="text-muted-foreground">Join a community of learners and help each other grow</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Trophy className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Practical Projects</h3>
            <p className="text-muted-foreground">Build real-world projects to add to your portfolio</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Target className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Career Focused</h3>
            <p className="text-muted-foreground">Curriculum designed to help you land your dream job</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
