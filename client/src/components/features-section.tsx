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
          <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6">
              <feature.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
