import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, Download, FileText } from "lucide-react";
import PDFPreview from "@/components/pdf-preview"; // Placeholder component

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Explore More</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{note.title}</DialogTitle>
          <DialogDescription className="text-base mt-2">
            {note.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="w-20 h-20 bg-primary/10 rounded-full mb-4 flex items-center justify-center">
              <FileText className="h-10 w-10 text-primary" />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-1 text-primary flex-shrink-0 mt-0.5" />
                  <span>Comprehensive coverage of all important concepts</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-1 text-primary flex-shrink-0 mt-0.5" />
                  <span>Clear explanations with detailed diagrams</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-1 text-primary flex-shrink-0 mt-0.5" />
                  <span>Practice problems with step-by-step solutions</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 mr-1 text-primary flex-shrink-0 mt-0.5" />
                  <span>Exam preparation strategies and tips</span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">{note.pages} pages</span>
              <p className="text-2xl font-bold">₹{note.price}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-semibold mb-2">Note Details</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Format:</div>
                <div>PDF (Digital Download)</div>
                <div>Pages:</div>
                <div>{note.pages}</div>
                <div>Language:</div>
                <div>English</div>
                <div>Last Updated:</div>
                <div>March 2024</div>
              </div>
            </div>

            <PDFPreview pages={note.previewPages} /> {/* Added PDF preview component */}


            <Button
              onClick={() => {
                onPurchase();
                setOpen(false);
              }}
              size="lg"
              className="w-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Purchase Notes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}