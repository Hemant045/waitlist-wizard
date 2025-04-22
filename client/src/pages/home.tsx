
import HeroSection from "@/components/hero-section";
import WaitlistForm from "@/components/waitlist-form";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Brain, Rocket, Users2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />

        {/* Why Choose Us Section */}
        <section className="py-20 bg-primary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="card-glow hover-lift">
                <CardContent className="pt-8">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Code2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Industry-Relevant</h3>
                  <p className="text-muted-foreground text-center">Curriculum designed with industry experts</p>
                </CardContent>
              </Card>

              <Card className="card-glow hover-lift">
                <CardContent className="pt-8">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Learn by Doing</h3>
                  <p className="text-muted-foreground text-center">Hands-on projects and real-world applications</p>
                </CardContent>
              </Card>

              <Card className="card-glow hover-lift">
                <CardContent className="pt-8">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Users2 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Community</h3>
                  <p className="text-muted-foreground text-center">Join a thriving community of learners</p>
                </CardContent>
              </Card>

              <Card className="card-glow hover-lift">
                <CardContent className="pt-8">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Rocket className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Career Growth</h3>
                  <p className="text-muted-foreground text-center">Get placement support and career guidance</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <WaitlistForm />
        <Footer />
      </main>
    </div>
  );
}
