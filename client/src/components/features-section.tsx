import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Target, Zap } from "lucide-react";

const features = [
  {
    title: "Streamlined Workflow",
    description: "Optimize your business processes with our intuitive interface",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf"
  },
  {
    title: "Data-Driven Insights",
    description: "Make informed decisions with powerful analytics tools",
    icon: Target,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
  },
  {
    title: "Smart Automation",
    description: "Let AI handle your repetitive tasks while you focus on growth",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold text-center mb-12">
        Why Choose Our Platform
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card 
            key={index} 
            className="overflow-hidden card-glow hover-lift group" 
            style={{animationDelay: `${index * 200}ms`}}
          >
            <div className="relative overflow-hidden">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <CardContent className="p-6 relative z-10">
              <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
