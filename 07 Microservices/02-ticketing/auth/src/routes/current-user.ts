import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.get("/api/users/currentuser", (req: Request, res: Response) => {
  console.log("req.ip:", req.ip);
  res.send("Hi there!");
});

export { router as currentUserRouter };
