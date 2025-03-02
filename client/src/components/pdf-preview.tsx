import { useState } from "react";
import { Lock, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFPreviewProps {
  previewPages: string[];
  title: string;
  price: number;
  onPurchase: () => void;
}

export default function PDFPreview({ previewPages, title, price, onPurchase }: PDFPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative rounded-lg overflow-hidden border bg-background transition-all duration-300"
      style={{ 
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isHovered ? '0 20px 25px -5px rgb(0 0 0 / 0.1)' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Preview Pages */}
      <div className="grid grid-cols-2 gap-2 p-4">
        {previewPages.map((page, index) => (
          <div key={index} className="aspect-[3/4] relative">
            <img
              src={page}
              alt={`${title} - Page ${index + 1}`}
              className="w-full h-full object-cover rounded border"
            />
            {index === previewPages.length - 1 && (
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 flex flex-col items-center justify-end p-4">
                <Lock className="h-8 w-8 text-primary mb-2" />
                <p className="text-lg font-semibold mb-1">
                  Get Full Access for ₹{price}
                </p>
                <p className="text-sm text-muted-foreground text-center mb-3">
                  Unlock all pages and start learning today!
                </p>
                <Button
                  size="lg"
                  className="w-full max-w-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    onPurchase();
                  }}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Purchase Full Notes
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Preview message */}
      <div className="px-4 pb-4 text-center">
        <p className="text-sm text-muted-foreground">
          Previewing {previewPages.length} of 150+ pages. Purchase to access all content.
        </p>
      </div>
    </div>
  );
}