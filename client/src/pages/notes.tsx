import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const notes = [
  {
    title: "Data Structures and Algorithms Notes",
    description: "Comprehensive notes covering all important DSA topics with examples",
    price: 499,
    pages: 150
  },
  {
    title: "Web Development Cheat Sheet",
    description: "Quick reference for HTML, CSS, JavaScript, and React concepts",
    price: 299,
    pages: 75
  },
  {
    title: "System Design Interview Notes",
    description: "Essential concepts and patterns for system design interviews",
    price: 799,
    pages: 200
  }
];

export default function Notes() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Study Notes</h1>
      <p className="text-xl text-muted-foreground mb-8">
        High-quality study materials created by experts to help you learn better and faster.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {notes.map((note, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <FileText className="h-12 w-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
              <p className="text-muted-foreground mb-4">{note.description}</p>
              <p className="text-sm text-muted-foreground">{note.pages} pages</p>
              <p className="text-2xl font-bold mt-2">₹{note.price}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Purchase Notes</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
