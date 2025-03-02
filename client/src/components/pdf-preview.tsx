
import { useState, useEffect, useCallback } from "react";
import { Lock, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from 'embla-carousel-react';

type PDFPreviewProps = {
  pages: string[];
  title?: string;
  price?: number;
  onPurchase?: () => void;
};

export default function PDFPreview({ pages, title, price, onPurchase }: PDFPreviewProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="bg-muted rounded-lg p-4">
      <h3 className="font-semibold mb-2">Preview</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Sample pages are available to preview before purchase
      </p>
      
      <div className="overflow-hidden rounded-md border" ref={emblaRef}>
        <div className="flex">
          {pages.map((page, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0 overflow-hidden aspect-[3/4]">
              <img 
                src={page} 
                alt={`${title || 'Note'} - Page ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Lock overlay on last preview page */}
              {index === pages.length - 1 && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95 flex flex-col items-center justify-end p-6">
                  <div className="bg-primary/10 rounded-full p-3 mb-3">
                    <Lock className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-center text-lg font-medium mb-2">Want to see more?</p>
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    Purchase the full notes to access all {pages.length + 15}+ pages
                  </p>
                  {price && (
                    <div className="text-lg font-bold mb-3">₹{price}</div>
                  )}
                  <Button 
                    onClick={onPurchase}
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
      <div className="flex items-center justify-between mt-3">
        <div className="flex gap-1">
          {pages.map((_, index) => (
            <div 
              key={index} 
              className={`h-1.5 w-3 rounded-full ${index === currentSlide ? 'bg-primary' : 'bg-muted-foreground/30'}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button 
            size="icon" 
            variant="outline" 
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
