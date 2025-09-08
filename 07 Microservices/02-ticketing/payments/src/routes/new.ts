import express, { Request, RequestHandler, Response, Router } from "express";
import { body } from "express-validator";

import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from "@rallycoding/common";
import { stripe } from "../stripe";
import { Order } from "../models/order";

const router: Router = express.Router();

router.post(
  "/api/payments",
  requireAuth as unknown as RequestHandler,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest as unknown as RequestHandler,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for an cancelled order");
    }

    await stripe.charges.create({
      currency: "usd",
      amount: order.price * 100,
      source: token,
    });

    res.status(201).send({ success: true });
  }
);

export { router as createChargeRouter };
