import mongoose from "mongoose";
import express, { Request, RequestHandler, Response, Router } from "express";
import { body } from "express-validator";

import { requireAuth, validateRequest } from "@rallycoding/common";

const router: Router = express.Router();

router.post(
  "/api/orders",
  requireAuth as unknown as RequestHandler,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest as unknown as RequestHandler,
  async (_req: Request, res: Response) => {
    res.send({});
  }
);

export { router as newOrderRouter };
