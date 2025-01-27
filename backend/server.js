import dotenv from "dotenv";
import express from "express";
import Stripe from "stripe";
import cors from "cors";

dotenv.config(); // Load environment variables

const app = express();
const stripeSecretKey = process.env.VITE_STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is missing in the .env file.");
}

const stripe = new Stripe(stripeSecretKey); // Use the correct key

// Middleware
app.use(cors());
app.use(express.json());

// Create Payment Intent
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: "usd",
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
