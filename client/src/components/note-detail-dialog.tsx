
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
import { ChevronRight, Download, FileText } from "lucide-react";

export default function NoteDetailDialog({ note, onPurchase }) {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Demo Notes
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            {note.title} - Demo Preview
          </DialogTitle>

          <div className="bg-muted/20 p-4 rounded-lg">
            <div className="relative bg-white rounded-lg shadow-lg">
              {/* Main preview image */}
              <img
                src={note.previewPages[currentPage]}
                alt={`${note.title} - Page ${currentPage + 1}`}
                className="w-full rounded-lg"
              />

              {/* Page navigation */}
              <div className="absolute top-1/2 -translate-y-1/2 left-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  className="bg-white/90 hover:bg-white"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </Button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(prev => Math.min(note.previewPages.length - 1, prev + 1))}
                  disabled={currentPage === note.previewPages.length - 1}
                  className="bg-white/90 hover:bg-white"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Page indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {currentPage + 1} / {note.previewPages.length}
              </div>

              {/* Purchase overlay */}
              {currentPage === note.previewPages.length - 1 && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95 flex flex-col items-center justify-end p-6 rounded-lg">
                  <p className="text-center text-lg font-medium mb-2">Want to see more?</p>
                  <p className="text-center text-sm text-muted-foreground mb-4">
                    Purchase the full notes to access all content.
                  </p>
                  {note.price && (
                    <div className="text-lg font-bold mb-3">₹{note.price}</div>
                  )}
                  <Button
                    onClick={() => {
                      onPurchase?.();
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

            {/* Thumbnail navigation */}
            <div className="flex gap-2 mt-4 justify-center">
              {note.previewPages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentPage === index ? "bg-primary w-6" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
