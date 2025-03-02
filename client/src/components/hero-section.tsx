import { Button } from "@/components/ui/button";
import { ChevronRight, GraduationCap, Target, Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="py-20 text-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8 animate-in slide-in-from-bottom duration-500">
          <GraduationCap className="h-4 w-4" />
          <span className="text-sm font-medium">Transform Your Career With Us</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-in slide-in-from-bottom duration-500">
          Master New Skills &<br />Launch Your Tech Career
        </h1>

        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in slide-in-from-bottom duration-500 delay-150">
          Join thousands of successful students who have transformed their careers with our industry-leading courses. Quality education at affordable prices.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in slide-in-from-bottom duration-500 delay-300">
          <Button size="lg" className="group" onClick={() => {
            document.querySelector("#course-list")?.scrollIntoView({ behavior: "smooth" });
          }}>
            Browse Courses
            <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button size="lg" variant="outline">
            View Study Notes
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-center">
          <div className="p-6 rounded-lg bg-background/50 backdrop-blur border">
            <Target className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Industry-Relevant</h3>
            <p className="text-muted-foreground">Curriculum designed with industry experts</p>
          </div>

          <div className="p-6 rounded-lg bg-background/50 backdrop-blur border">
            <Users className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">1-on-1 Mentorship</h3>
            <p className="text-muted-foreground">Get guidance from experienced developers</p>
          </div>

          <div className="p-6 rounded-lg bg-background/50 backdrop-blur border">
            <GraduationCap className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Placement Support</h3>
            <p className="text-muted-foreground">Interview prep and job referrals</p>
          </div>
        </div>
      </div>
    </section>
  );
}