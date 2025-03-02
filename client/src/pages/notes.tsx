import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ChevronRight } from "lucide-react";
import PDFPreview from "@/components/pdf-preview";

const notes = [
  {
    title: "Data Structures and Algorithms Notes",
    description: "Comprehensive notes covering all important DSA topics with examples",
    price: 499,
    pages: 150,
    topics: [
      "Priority Queue",
      "Binary Tree",
      "Binary Search Tree",
      "Graphs",
      "Dynamic Programming"
    ],
    previewPages: [
      "/preview/dsa/page1.jpg",
      "/preview/dsa/page2.jpg",
      "/preview/dsa/page3.jpg",
      "/preview/dsa/page4.jpg"
    ],
    samplePdfUrl: "/sample-notes/dsa-preview.pdf",
    imageUrl: "/images/dsa-icon.png"
  },
  {
    title: "Web Development Cheat Sheet",
    description: "Quick reference for HTML, CSS, JavaScript, and React concepts",
    price: 299,
    pages: 75,
    topics: [
      "HTML5 & CSS3",
      "JavaScript ES6+",
      "React Hooks",
      "Node.js Basics",
      "API Integration"
    ],
    previewPages: [
      "/preview/webdev/page1.jpg",
      "/preview/webdev/page2.jpg",
      "/preview/webdev/page3.jpg",
      "/preview/webdev/page4.jpg"
    ],
    samplePdfUrl: "/sample-notes/webdev-preview.pdf",
    imageUrl: "/images/webdev-icon.png"
  },
  {
    title: "System Design Interview Notes",
    description: "Essential concepts and patterns for system design interviews",
    price: 799,
    pages: 200,
    topics: [
      "Scalability",
      "Load Balancing",
      "Caching",
      "Database Design",
      "Microservices"
    ],
    previewPages: [
      "/preview/system-design/page1.jpg",
      "/preview/system-design/page2.jpg",
      "/preview/system-design/page3.jpg",
      "/preview/system-design/page4.jpg"
    ],
    samplePdfUrl: "/sample-notes/system-design-preview.pdf",
    imageUrl: "/images/system-design-icon.png"
  }
];

export type Note = {
  id?: number;
  title: string;
  description: string;
  price: number;
  pages: number;
  topics: string[];
  previewPages: string[];
  samplePdfUrl?: string;
  imageUrl?: string;
};

import NoteDetailDialog from "@/components/note-detail-dialog";

export default function Notes() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Handwritten Study Notes</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          High-quality study materials created by experts to help you learn better and faster. 
          Each set of notes includes detailed explanations, diagrams, and examples.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        {notes.map((note, index) => (
          <Card key={index} className="group relative overflow-hidden hover:shadow-xl transition-all duration-300">
            <CardContent className="p-0">
              {/* Subject image as card background */}
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={note.imageUrl || note.previewPages[0]} 
                    alt={note.title} 
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  {/* Transparent overlay with title at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-xl font-semibold mb-1 text-white">{note.title}</h3>
                    <span className="text-sm text-white/70">{note.pages} pages</span>
                  </div>
                </div>
              </div>
              
              {/* Content section with price - no topic information */}
              <div className="p-4">
                <div className="flex items-center justify-end transition-opacity duration-300 group-hover:opacity-0">
                  <p className="text-2xl font-bold text-primary">₹{note.price}</p>
                </div>
              </div>

              {/* Hover overlay for "Explore More" that rises from the bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 flex justify-center p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <NoteDetailDialog 
                  note={note}
                  onPurchase={() => {
                    // Handle purchase flow
                    console.log("Purchase clicked for", note.title);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust indicators */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-6">Why Choose Our Notes?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6">
            <h3 className="text-lg font-medium mb-2">Expert-Created Content</h3>
            <p className="text-muted-foreground">
              Notes prepared by experienced teachers and industry professionals
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-2">Easy to Understand</h3>
            <p className="text-muted-foreground">
              Clear explanations with practical examples and illustrations
            </p>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium mb-2">Instant Access</h3>
            <p className="text-muted-foreground">
              Download immediately after purchase and start learning
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}