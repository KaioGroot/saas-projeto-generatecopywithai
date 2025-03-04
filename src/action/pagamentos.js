import Stripe from "stripe";

const stripe = new Stripe("sk_test_51QAJN9KiCJLvbSVLtzcG0RJJMAR5RzIcFcdhKtDnfF9gsbr2CoYJ1OM7NQTrwKaXHC0ZGH01g2aVW6267DVdeDJE00MJiii89F");

export async function createPaymentIntent(amount) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "brl",
    payment_method_types: ["card"],
    confirm: true,
  });
  return paymentIntent;
  // Use the returned paymentIntent.client_secret for client-side integration
  // ...
}