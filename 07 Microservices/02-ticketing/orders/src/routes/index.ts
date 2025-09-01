import express, { Request, RequestHandler, Response, Router } from "express";

import { requireAuth } from "@rallycoding/common";
import { Order } from "../models/order";

const router: Router = express.Router();

router.get("/api/orders", requireAuth as unknown as RequestHandler, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate("ticket");

  res.send(orders);
});

export { router as indexOrderRouter };
