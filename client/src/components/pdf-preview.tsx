
import { useState, useEffect } from "react";
import { Lock, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from 'embla-carousel-react';

interface PDFPreviewProps {
  previewPages: string[];
  title: string;
  price: number;
  onPurchase: () => void;
}

export default function PDFPreview({ previewPages, title, price, onPurchase }: PDFPreviewProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const onSelect = () => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  };

  return (
    <div className="relative rounded-lg overflow-hidden border bg-background">
      {/* Carousel container */}
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {previewPages.map((page, index) => (
            <div 
              key={index} 
              className="relative flex-[0_0_100%] min-w-0"
              style={{ paddingBottom: '141.4%' }} // A4 aspect ratio
            >
              <img
                src={page}
                alt={`${title} - Page ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Lock overlay on last preview page */}
              {index === previewPages.length - 1 && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95 flex flex-col items-center justify-end p-6">
                  <Lock className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Get Full Access for ₹{price}
                  </h3>
                  <p className="text-muted-foreground text-center mb-4 max-w-sm">
                    Unlock all pages and start learning today!
                    Get access to 150+ pages of detailed notes.
                  </p>
                  <Button
                    size="lg"
                    className="w-full max-w-xs"
                    onClick={onPurchase}
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

      {/* Navigation buttons */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Page indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {previewPages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index 
                ? "bg-primary w-4" 
                : "bg-primary/50"
            }`}
          />
        ))}
      </div>

      {/* Preview message */}
      <div className="p-4 text-center border-t">
        <p className="text-sm text-muted-foreground">
          Previewing {previewPages.length} of 150+ pages. Purchase to access all content.
        </p>
      </div>
    </div>
  );
}
