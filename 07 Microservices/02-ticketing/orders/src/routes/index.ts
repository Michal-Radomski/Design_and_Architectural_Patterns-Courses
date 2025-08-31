import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/api/orders", async (_req: Request, res: Response) => {
  res.send({});
});

export { router as indexOrderRouter };
