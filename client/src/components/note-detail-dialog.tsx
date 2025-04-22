
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, Download, FileText, Lock, ChevronLeft } from "lucide-react";

type NoteDetailDialogProps = {
  note: {
    title: string;
    description: string;
    topics: string[];
    price: number;
    pages: number;
    imageUrl?: string;
    previewPages: string[];
  };
  onPurchase: () => void;
};

export default function NoteDetailDialog({ note, onPurchase }: NoteDetailDialogProps) {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const goToNextPage = () => {
    if (currentPage < note.previewPages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Demo Notes</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{note.title}</DialogTitle>
          <DialogDescription className="text-base mt-2">
            {note.description}
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex-1 overflow-hidden mt-4">
          {/* Main preview container */}
          <div className="relative h-[calc(100vh-300px)] bg-muted/20 rounded-lg overflow-hidden">
            <div 
              className="h-full transition-transform duration-500 ease-out flex items-center justify-center"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {note.previewPages.map((page, index) => (
                <div
                  key={index}
                  className="absolute top-0 left-0 w-full h-full transition-transform duration-500"
                  style={{ transform: `translateX(${index * 100}%)` }}
                >
                  <img
                    src={page}
                    alt={`Page ${index + 1}`}
                    className="w-full h-full object-contain bg-white rounded-lg shadow-lg"
                  />
                  
                  {/* Lock overlay on last preview page */}
                  {index === note.previewPages.length - 1 && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95 flex flex-col items-center justify-end p-6">
                      <div className="bg-primary/10 rounded-full p-3 mb-3">
                        <Lock className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-center text-lg font-medium mb-2">Want to see more?</p>
                      <p className="text-center text-sm text-muted-foreground mb-4">
                        Purchase the full notes to access all {note.pages}+ pages
                      </p>
                      <div className="text-lg font-bold mb-3">₹{note.price}</div>
                      <Button onClick={onPurchase} className="w-full mb-2">
                        <Download className="h-4 w-4 mr-2" />
                        Purchase Full Notes
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={goToPrevPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
              onClick={goToNextPage}
              disabled={currentPage === note.previewPages.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Page indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-3 py-1 rounded-full">
              {currentPage + 1} / {note.previewPages.length}
            </div>
          </div>

          {/* Bottom navigation dots */}
          <div className="flex justify-center gap-2 mt-4">
            {note.previewPages.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentPage ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                }`}
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
