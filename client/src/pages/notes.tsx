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
            <CardContent className="pt-6">
              {/* Circle background for icon */}
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <FileText className="h-12 w-12 text-primary" />
              </div>

              <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
              <p className="text-muted-foreground mb-4">{note.description}</p>

              {/* Topics list */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Topics Covered:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {note.topics.map((topic, i) => (
                    <li key={i} className="flex items-center">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">{note.pages} pages</span>
                <p className="text-2xl font-bold">₹{note.price}</p>
              </div>

              {/* PDF Preview */}
              <PDFPreview
                title={note.title}
                previewPages={note.previewPages}
                price={note.price}
                onPurchase={() => {
                  // Handle purchase flow
                  console.log("Purchase clicked for", note.title);
                }}
              />
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