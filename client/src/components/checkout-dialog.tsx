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
  const [upiTransactionId, setUpiTransactionId] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const { toast } = useToast();

  const createOrder = useMutation({
    mutationFn: async () => {
      if (!course) return;
      const res = await apiRequest("POST", "/api/orders", {
        courseId: course.id,
        email
      });
      return res.json();
    },
    onSuccess: (data) => {
      setOrderId(data.orderId);
      setShowVerification(true);
      toast({
        title: "Order Created",
        description: "Please complete the payment using the UPI ID shown below.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const verifyPayment = useMutation({
    mutationFn: async () => {
      if (!orderId) return;
      await apiRequest("POST", `/api/orders/${orderId}/verify`, {
        upiTransactionId
      });
    },
    onSuccess: () => {
      toast({
        title: "Payment Submitted",
        description: "We'll verify your payment and activate your course access soon.",
      });
      onOpenChange(false);
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
          <DialogTitle>Purchase Course: {course.title}</DialogTitle>
          <DialogDescription>
            {!showVerification 
              ? "Enter your email to proceed with the payment"
              : "Complete the payment and enter the UPI transaction ID"
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Amount to pay</p>
            <p className="text-2xl font-bold">₹{Number(course.price).toLocaleString('en-IN')}</p>
          </div>

          {!showVerification ? (
            <div className="space-y-2">
              <p className="text-sm font-medium">Email</p>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="w-full"
                onClick={() => createOrder.mutate()}
                disabled={!email || createOrder.isPending}
              >
                {createOrder.isPending ? "Processing..." : "Proceed to Payment"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium mb-2">Pay using UPI:</p>
                <p className="text-lg font-mono select-all">{process.env.VITE_BUSINESS_UPI_ID}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  1. Open your UPI app (GPay, PhonePe, etc.)<br/>
                  2. Send ₹{Number(course.price).toLocaleString('en-IN')} to the UPI ID above<br/>
                  3. Copy the UPI transaction ID from your payment app<br/>
                  4. Paste the ID below and click verify
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">UPI Transaction ID</p>
                <Input
                  placeholder="Enter UPI transaction ID"
                  value={upiTransactionId}
                  onChange={(e) => setUpiTransactionId(e.target.value)}
                />
              </div>

              <Button
                className="w-full"
                onClick={() => verifyPayment.mutate()}
                disabled={!upiTransactionId || verifyPayment.isPending}
              >
                {verifyPayment.isPending ? "Verifying..." : "Verify Payment"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}