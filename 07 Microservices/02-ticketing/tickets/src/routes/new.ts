import express, { Request, RequestHandler, Response, Router } from "express";
import { body } from "express-validator";

import { requireAuth, validateRequest } from "@rallycoding/common";

const router: Router = express.Router();

router.post(
  "/api/tickets",
  requireAuth as unknown as RequestHandler,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  ],
  validateRequest as unknown as RequestHandler,
  (_req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export { router as createTicketRouter };
