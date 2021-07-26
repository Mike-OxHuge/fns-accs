import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import Head from "next/head";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PreviewPage() {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <>
      <Head>
        <title>Stripe integration</title>
        {/* <meta
          httpEquiv="Content-Security-Policy"
          content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com/v3"
        ></meta> */}
      </Head>
      <form action="/api/checkout_sessions" method="POST">
        <section>
          <div className="product">
            <img
              src="https://i.imgur.com/EHyR2nP.png"
              alt="The cover of Stubborn Attachments"
            />
            <div className="description">
              <h3>Stubborn Attachments</h3>
              <h5 style={{ opacity: 0.5 }}>$20.00</h5>
            </div>
          </div>
          <button type="submit" role="link">
            Checkout
          </button>
        </section>
        <style jsx>
          {`
            section {
              background: #ffffff;
              display: flex;
              flex-direction: column;
              width: 400px;
              height: 112px;
              border-radius: 6px;
              justify-content: space-between;
            }
            .product {
              display: flex;
            }
            .description {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            img {
              border-radius: 4px;
              margin: 10px;
              width: 56px;
              height: 56px;
            }
            h3,
            h5 {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                "Roboto", "Helvetica Neue", "Ubuntu", sans-serif;
              font-style: normal;
              font-weight: 500;
              font-size: 14px;
              line-height: 20px;
              letter-spacing: -0.154px;
              color: #242d60;
              margin: 0;
            }
            button {
              height: 36px;
              background: #556cd6;
              border-radius: 0 0 4px 4px;
              color: white;
              border: 0;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
            }
            button:hover {
              opacity: 0.8;
            }
          `}
        </style>
      </form>
    </>
  );
}
