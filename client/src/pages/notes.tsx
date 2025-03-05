import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NoteDetailDialog from "@/components/note-detail-dialog";
import { FileText, Download, ChevronRight, ChevronLeft, Lock } from "lucide-react";
import PDFPreview from "@/components/pdf-preview";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

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

// Demo Preview Dialog Component
function DemoPreviewDialog({ note }) {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Create 5 preview pages (limit for demo)
  const previewPages = note.previewPages || [
    "/preview/system-design/page1.jpg",
    "/preview/system-design/page2.jpg",
    "/preview/system-design/page3.jpg",
    "/preview/system-design/page4.jpg",
    "/preview/system-design/page5.jpg",
  ];
  
  const totalPages = previewPages.length;
  const maxPreviewPages = 5; // Show only 5 pages in demo
  
  const goToNextPage = () => {
    if (currentPage < maxPreviewPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Demo Notes
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            {note.title} - Demo Preview
          </DialogTitle>
          
          <div className="relative overflow-hidden rounded-lg border aspect-[3/4] bg-muted">
            {/* Current page display */}
            <div className="relative h-full w-full">
              <img 
                src={previewPages[currentPage]} 
                alt={`${note.title} - Page ${currentPage + 1}`}
                className="h-full w-full object-contain"
              />
              
              {/* Page counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                Page {currentPage + 1} of {maxPreviewPages}
              </div>
              
              {/* Lock overlay on last preview page */}
              {currentPage === maxPreviewPages - 1 && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95 flex flex-col items-center justify-end p-6">
                  <div className="bg-primary/10 rounded-full p-3 mb-3">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-center text-lg font-medium mb-2">Want to see more?</p>
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    This is a preview. Purchase the full notes to access all content.
                  </p>
                  {note.price && (
                    <div className="text-lg font-bold mb-3">₹{note.price}</div>
                  )}
                  <Button 
                    onClick={() => {
                      console.log("Purchase clicked for", note.title);
                      setOpen(false);
                    }}
                    className="w-full mb-2"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Purchase Full Notes
                  </Button>
                </div>
              )}
            </div>
            
            {/* Navigation buttons */}
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-background/80"
              onClick={goToPrevPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-background/80"
              onClick={goToNextPage}
              disabled={currentPage === maxPreviewPages - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            {/* Page indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1">
              {Array.from({ length: maxPreviewPages }).map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 w-3 rounded-full cursor-pointer ${
                    index === currentPage ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrentPage(index)}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

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
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 flex justify-center gap-2 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <NoteDetailDialog note={note} onPurchase={() => {console.log("Purchase clicked for", note.title);}}/>
                <DemoPreviewDialog note={note} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust indicators */}
      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold mb-2 gradient-text">Why Choose Our Notes?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-12">Our study notes are designed to help you excel in your exams and master complex subjects quickly</p>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 card-glow hover-lift text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Expert-Created Content</h3>
            <p className="text-muted-foreground">
              Notes prepared by experienced teachers and industry professionals with years of teaching experience
            </p>
          </Card>

          <Card className="p-6 card-glow hover-lift text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Easy to Understand</h3>
            <p className="text-muted-foreground">
              Clear explanations with practical examples and illustrations that make complex topics simple
            </p>
          </Card>

          <Card className="p-6 card-glow hover-lift text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Instant Access</h3>
            <p className="text-muted-foreground">
              Download immediately after purchase and start learning without any delays or wait times
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}