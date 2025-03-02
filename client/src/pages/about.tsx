import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, Trophy, Target } from "lucide-react";

export default function About() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 shadow-sm">
          <Target className="h-4 w-4" />
          <span className="text-sm font-medium">Your success is our mission</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
          Transform Your Career with Expert-Led Courses
        </h1>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Join thousands of successful students who have advanced their careers through our comprehensive courses designed for real-world skills.
        </p>
        
        <Button size="lg" className="px-8 py-6 text-lg shadow-lg hover-lift" asChild>
          <a href="/courses">Browse Courses</a>
        </Button>
        
        <div className="mt-12 pt-6 border-t flex justify-center gap-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold gradient-text">15,000+</span>
            <span className="text-muted-foreground">Students</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold gradient-text">25+</span>
            <span className="text-muted-foreground">Courses</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold gradient-text">96%</span>
            <span className="text-muted-foreground">Success Rate</span>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        <Card className="card-glow hover-lift border-t-4 border-blue-500">
          <CardContent className="pt-8">
            <div className="bg-blue-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <GraduationCap className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Expert Instructors</h3>
            <p className="text-muted-foreground text-center">Learn from industry professionals with years of real-world experience</p>
          </CardContent>
        </Card>
        
        <Card className="card-glow hover-lift border-t-4 border-purple-500">
          <CardContent className="pt-8">
            <div className="bg-purple-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Community Support</h3>
            <p className="text-muted-foreground text-center">Join a thriving community of learners and help each other grow</p>
          </CardContent>
        </Card>
        
        <Card className="card-glow hover-lift border-t-4 border-emerald-500">
          <CardContent className="pt-8">
            <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Trophy className="h-8 w-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Practical Projects</h3>
            <p className="text-muted-foreground text-center">Build impressive real-world projects to showcase in your portfolio</p>
          </CardContent>
        </Card>
        
        <Card className="card-glow hover-lift border-t-4 border-amber-500">
          <CardContent className="pt-8">
            <div className="bg-amber-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Target className="h-8 w-8 text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-center">Career Focused</h3>
            <p className="text-muted-foreground text-center">Curriculum strategically designed to help you land your dream job</p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
