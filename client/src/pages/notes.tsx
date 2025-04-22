import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { FileText, Download, ChevronRight, ChevronLeft, Lock } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import NoteDetailDialog from "@/components/note-detail-dialog";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { arrayBufferToBase64 } from '@/utils/base64';


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
      "/preview/system-design/page4.jpg",
      "/preview/system-design/page5.jpg"
    ],
    samplePdfUrl: "/sample-notes/system-design-preview.pdf",
    imageUrl: "/images/system-design-icon.png"
  }
];

// Demo Preview Dialog Component
const DemoPreviewDialog = ({ note }: { note: Note }) => {
  const [open, setOpen] = useState(false);
  const [pdfData, setPdfData] = useState<string | null>(null);
  
  // Refs for 3D transform effect
  const slideContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // State for carousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Fetch PDF data (replace with actual PDF fetching logic)
  const fetchPdf = async () => {
    try {
      const response = await fetch(note.samplePdfUrl!);
      const blob = await response.blob();
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = arrayBufferToBase64(arrayBuffer);
      setPdfData(base64);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  // Create 5 preview pages (limit for demo)
  const previewPages = note.previewPages || [
    "/preview/system-design/page1.jpg",
    "/preview/system-design/page2.jpg",
    "/preview/system-design/page3.jpg",
    "/preview/system-design/page4.jpg",
    "/preview/system-design/page5.jpg",
  ];

  const maxPreviewPages = 5; // Show only 5 pages in demo

  // Handle mouse events for dragging effect
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!slideContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - slideContainerRef.current.offsetLeft);
    setScrollLeft(slideContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Snap to closest page
    if (slideContainerRef.current) {
      const slideWidth = slideContainerRef.current.offsetWidth * 0.8; // 80% width per slide
      const closestIndex = Math.round(slideContainerRef.current.scrollLeft / slideWidth);
      slideContainerRef.current.scrollTo({
        left: closestIndex * slideWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(closestIndex);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !slideContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - slideContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    slideContainerRef.current.scrollLeft = scrollLeft - walk;
    
    // Update transforms while dragging
    updateTransforms();
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  // Navigate between pages
  const goToPage = (index: number) => {
    if (!slideContainerRef.current) return;
    if (index >= 0 && index < maxPreviewPages) {
      const slideWidth = slideContainerRef.current.offsetWidth * 0.8; // 80% width per slide
      slideContainerRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };
  
  const goToNextPage = () => goToPage(currentIndex + 1);
  const goToPrevPage = () => goToPage(currentIndex - 1);
  
  // Update 3D transform effects based on scroll position
  const updateTransforms = () => {
    if (!slideContainerRef.current) return;
    
    const containerWidth = slideContainerRef.current.offsetWidth;
    const slideWidth = containerWidth * 0.8; // 80% width per slide
    const scrollPosition = slideContainerRef.current.scrollLeft;
    
    slideRefs.current.forEach((slideRef: HTMLDivElement | null, index: number) => {
      if (!slideRef) return;
      
      const slideCenter = index * slideWidth;
      const distanceFromCenter = slideCenter - scrollPosition;
      const percentFromCenter = distanceFromCenter / containerWidth;
      
      // Apply 3D transforms
      const rotateY = percentFromCenter * 30; // 30 degrees max rotation
      const scale = Math.max(0.8, 1 - Math.abs(percentFromCenter) * 0.2);
      const translateZ = -Math.abs(percentFromCenter) * 100;
      const opacity = Math.max(0.5, 1 - Math.abs(percentFromCenter) * 0.5);
      
      slideRef.style.transform = `perspective(1000px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`;
      slideRef.style.opacity = `${opacity}`;
      slideRef.style.zIndex = `${Math.round(10 - Math.abs(percentFromCenter) * 10)}`;
    });
    
    // Update current index based on scroll
    const newIndex = Math.round(scrollPosition / slideWidth);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < maxPreviewPages) {
      setCurrentIndex(newIndex);
    }
  };
  
  // Scroll event handler
  const handleScroll = () => {
    if (isDragging) return;
    updateTransforms();
  };
  
  // Effect to set up scroll listener
  useEffect(() => {
    const container = slideContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  // Effect to update transforms when container changes or on mount
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        updateTransforms();
      }, 100);
    }
  }, [open]);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => {setOpen(true); fetchPdf()}}>
        Demo Notes
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            {note.title} - Demo Preview
          </DialogTitle>

          <div className="bg-muted/20 p-4 rounded-lg">
            <div 
              className="relative overflow-x-auto py-8 hide-scrollbar" 
              style={{ perspective: '1000px' }}
              ref={slideContainerRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex pl-[10%] pr-[10%] gap-[5%]">
                {previewPages.map((page: string, index: number) => (
                  <div
                    key={index}
                    ref={el => slideRefs.current[index] = el}
                    className="relative flex-[0_0_80%] min-w-0 aspect-[3/4] transition-all duration-300"
                    style={{
                      transformStyle: 'preserve-3d',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                      transform: 'rotateY(0deg) scale(1)',
                    }}
                  >
                    {pdfData && false ? (
                      <iframe
                        src={`data:application/pdf;base64,${pdfData}`}
                        width="100%"
                        height="100%"
                        title="PDF Preview"
                        className="h-full w-full bg-white rounded-lg"
                      />
                    ) : (
                      <img
                        src={page}
                        alt={`${note.title} - Page ${index + 1}`}
                        className="h-full w-full object-contain bg-white rounded-lg border"
                      />
                    )}

                    {/* Page number */}
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {index + 1} / {maxPreviewPages}
                    </div>

                    {/* Lock overlay on last preview page */}
                    {index === maxPreviewPages - 1 && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95 flex flex-col items-center justify-end p-6 rounded-lg">
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
                ))}
              </div>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 shadow-sm"
                onClick={goToPrevPage}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <div className="flex gap-2">
                {Array.from({ length: maxPreviewPages }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full cursor-pointer transition-transform duration-300 
                      ${index === currentIndex ? 'bg-primary w-8' : 'bg-muted-foreground/30 w-2'}`}
                    onClick={() => goToPage(index)}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-background/80 shadow-sm"
                onClick={goToNextPage}
                disabled={currentIndex === maxPreviewPages - 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-muted-foreground text-center mt-4">
              Drag to flip through pages or use the navigation controls
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

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
              <div className="relative overflow-hidden rounded-t-lg">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={note.imageUrl || note.previewPages[0]}
                    alt={note.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-xl font-semibold mb-1 text-white">{note.title}</h3>
                    <span className="text-sm text-white/70">{note.pages} pages</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-end transition-opacity duration-300 group-hover:opacity-0">
                  <p className="text-2xl font-bold text-primary">₹{note.price}</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 flex justify-center gap-2 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <DemoPreviewDialog note={note} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

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