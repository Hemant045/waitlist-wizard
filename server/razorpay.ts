import Razorpay from "razorpay";

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Missing Razorpay credentials");
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function createPaymentOrder(
  courseId: number,
  courseTitle: string,
  priceInRupees: number,
  customerEmail: string
): Promise<{
  orderId: string;
  keyId: string;
}> {
  const options = {
    amount: priceInRupees * 100, // Razorpay expects amount in paise
    currency: "INR",
    receipt: `course_${courseId}_${Date.now()}`,
    notes: {
      courseId: courseId.toString(),
      courseTitle,
      customerEmail,
    },
  };

  const order = await razorpay.orders.create(options);

  return {
    orderId: order.id,
    keyId: process.env.RAZORPAY_KEY_ID!,
  };
}

export function validatePaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = orderId + "|" + paymentId;
  
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body.toString())
    .digest("hex");

  return expectedSignature === signature;
}
