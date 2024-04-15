import { validateCartItems } from "use-shopping-cart/utilities";
// import { validateCartItems } from "use-shopping-cart/src/serverUtil";
import Stripe from "stripe";
import { client } from "../../../lib/sanity/client";
import { eventQuery } from "../../../lib/sanity/eventQuery";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02",
});
export default async function handler(req, res) {
  // This endpoint will send the POST request to Stripe's servers.
  if (req.method === "POST") {
    try {
      // Validate the cart details that were sent from the client.
      const cartItems = req.body;

      // Sanity client performs eventQuery
      let sanityData = await client.fetch(eventQuery);

      // The POST request is then validated against the data from Sanity.
      const validate_line_items = validateCartItems(sanityData, cartItems);

      // Create an array of line items
      const line_items = await Promise.all(
        validate_line_items.map(async (item) => {
          const price = await stripe.prices.create({
            tax_behavior: "exclusive",
            currency: item.price_data.currency,
            product_data: item.price_data.product_data,
            unit_amount: item.price_data.unit_amount,
          });

          return {
            price: price.id,
            quantity: item.quantity,
            tax_rates: [`txr_1KzojjBgP7yfvDo82ngdwtid`],
          };
        })
      );

      // Create Checkout Sessions from body params.
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}`,
      };

      const checkoutSession = await stripe.checkout.sessions.create(params);

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
