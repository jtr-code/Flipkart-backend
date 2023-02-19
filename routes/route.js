import express from "express";
import { userSignup, userLogin } from "../controller/user-controller.js";
import {
  getProducts,
  getProductById,
} from "../controller/product-controller.js";
import Stripe from "stripe";


const stripe = new Stripe(
  "sk_test_51MZbS4SBaYCFHdmuMLHnitDJasAFrflVOo9FBRElxUoIU35SJYGv3IxHKhjnomwPzfWGbNwMzeTzcP3rfHPYMoSj000yVd4AfV"
);


const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);

router.get("/products", getProducts);
router.get("/product/:id", getProductById);

router.post("/checkout", async (req, res) => {
  console.log("Request", req.body);
  let error, status;
  try {
    const { product, token } = req.body;
    const customer = await stripe.customer.create({
      email: token.email,
      source: token.id,
    });
    console.log("customer",customer)

    const key = crypto.randomUUID();

    const charges = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "INR",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
      },
      {
        key,
      }
    );
    console.log("Charges", { charges });
    status = "success";
  } catch (error) {
    console.log(" error in router", error);
    status = "failure";
  }
  res.json({ error, status });
});

export default router;
