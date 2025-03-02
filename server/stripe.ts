import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function createPaymentSession(
  courseId: number,
  courseTitle: string,
  priceInRupees: number,
  customerEmail: string
): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "upi"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: courseTitle,
          },
          unit_amount: priceInRupees * 100, // Stripe expects amount in paise
        },
        quantity: 1,
      },
    ],
    customer_email: customerEmail,
    mode: "payment",
    success_url: `${process.env.REPL_SLUG}.repl.co/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.REPL_SLUG}.repl.co/courses/${courseId}`,
  });

  return session.id;
}
