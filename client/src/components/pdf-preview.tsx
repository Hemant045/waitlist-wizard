
import { useState, useEffect, useCallback, useRef } from "react";
import { Lock, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';

type PDFPreviewProps = {
  pages: string[];
  title?: string;
  price?: number;
  onPurchase?: () => void;
};

export default function PDFPreview({ pages, title, price, onPurchase }: PDFPreviewProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: 'center',
    dragFree: true
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  
  // For 3D effect
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const onSelect = useCallback((api: NonNullable<UseEmblaCarouselType[1]>) => {
    setCurrentSlide(api.selectedScrollSnap());
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
    setSlidesInView(api.slidesInView());
  }, []);

  const onScroll = useCallback((api: NonNullable<UseEmblaCarouselType[1]>) => {
    // For 3D effect
    const engine = api.internalEngine();
    const scrollProgress = api.scrollProgress();
    const slidesCount = api.slideNodes().length;
    
    api.slideNodes().forEach((slide: Element, index: number) => {
      const slideRef = slideRefs.current[index];
      if (!slideRef) return;
      
      // Calculate the slide's position relative to the center
      const slidePosition = engine.location.get() - index;
      
      // Apply rotation effect based on position
      const rotateY = slidePosition * 20; // 20 degrees per slide distance
      const scale = Math.max(0.8, 1 - Math.abs(slidePosition) * 0.15);
      const opacity = Math.max(0.5, 1 - Math.abs(slidePosition) * 0.25);
      const translateZ = Math.max(-150, -Math.abs(slidePosition) * 50);
      
      slideRef.style.transform = `perspective(1000px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${translateZ}px)`;
      slideRef.style.opacity = `${opacity}`;
      slideRef.style.zIndex = `${slidesCount - Math.abs(Math.round(slidePosition))}`;
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    
    emblaApi.on('select', () => onSelect(emblaApi));
    emblaApi.on('scroll', () => onScroll(emblaApi));
    emblaApi.on('init', () => onSelect(emblaApi));
    emblaApi.on('reInit', () => onSelect(emblaApi));
    
    return () => {
      emblaApi.off('select', () => onSelect(emblaApi));
      emblaApi.off('scroll', () => onScroll(emblaApi));
    };
  }, [emblaApi, onSelect, onScroll]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <h3 className="font-semibold mb-2">Preview</h3>
      <p className="text-sm text-muted-foreground mb-2">
        Sample pages are available to preview before purchase
      </p>
      
      <div className="relative overflow-hidden rounded-md border bg-background/50 py-8" style={{ perspective: '1000px' }}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {pages.map((page, index) => (
              <div 
                key={index} 
                className="relative flex-[0_0_80%] min-w-0 mx-2 overflow-hidden aspect-[3/4] transition-all duration-300"
                ref={el => slideRefs.current[index] = el}
                style={{ 
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 6px 14px rgba(0,0,0,0.15)'
                }}
              >
                <img 
                  src={page} 
                  alt={`${title || 'Note'} - Page ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-contain bg-white"
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
                
                {/* Page number overlay */}
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                  {index + 1} / {pages.length}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Side navigation buttons */}
        <Button
          size="icon"
          variant="outline"
          onClick={scrollPrev}
          disabled={prevBtnDisabled}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full border-primary/20 shadow-lg"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          size="icon"
          variant="outline"
          onClick={scrollNext}
          disabled={nextBtnDisabled}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full border-primary/20 shadow-lg"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Bottom navigation controls */}
      <div className="flex items-center justify-center mt-4">
        <div className="flex gap-2">
          {pages.map((_, index) => (
            <div 
              key={index} 
              onClick={() => scrollTo(index)}
              className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300
                ${index === currentSlide 
                  ? 'bg-primary w-6' 
                  : slidesInView.includes(index) 
                    ? 'bg-primary/50' 
                    : 'bg-muted-foreground/30'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
