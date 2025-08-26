import express, { Request, RequestHandler, Response, Router } from "express";
import { body } from "express-validator";

import { requireAuth, validateRequest } from "@rallycoding/common";
import { Ticket } from "../models/ticket";

const router: Router = express.Router();

router.post(
  "/api/tickets",
  requireAuth as unknown as RequestHandler,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  ],
  validateRequest as unknown as RequestHandler,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser?.id as string,
    });
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
