import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("Hi there!");
});

export { router as signoutRouter };
