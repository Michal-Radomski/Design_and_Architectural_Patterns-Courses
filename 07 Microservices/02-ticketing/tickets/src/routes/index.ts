import express, { Request, Response, Router } from "express";

import { Ticket } from "../models/ticket";

const router: Router = express.Router();

router.get("/api/tickets", async (_req: Request, res: Response) => {
  const tickets = await Ticket.find({
    orderId: undefined,
  });

  res.send(tickets);
});

export { router as indexTicketRouter };
