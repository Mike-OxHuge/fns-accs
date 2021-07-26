const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            // TODO: replace this with the `price` of the product you want to sell
            price: 20,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      res.redirect(303, session.url);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
