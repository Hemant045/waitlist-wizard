import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { type Course } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CheckoutDialogProps {
  course: Course | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CheckoutDialog({ course, open, onOpenChange }: CheckoutDialogProps) {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!course) return;
      const res = await apiRequest("POST", "/api/checkout", {
        courseId: course.id,
        email
      });
      const data = await res.json();
      return data;
    },
    onSuccess: (data) => {
      if (!data?.sessionId) return;
      // Redirect to Stripe Checkout
      window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Checkout: {course.title}</DialogTitle>
          <DialogDescription>
            Enter your email to proceed with the payment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Amount to pay</p>
            <p className="text-2xl font-bold">₹{Number(course.price).toLocaleString('en-IN')}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Email</p>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button
            className="w-full"
            onClick={() => mutation.mutate()}
            disabled={!email || mutation.isPending}
          >
            {mutation.isPending ? "Processing..." : "Proceed to Payment"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Secure payments powered by Stripe
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
