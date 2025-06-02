import { Router } from "express";
import { authRouter } from "./auth-router";

export const appRouter = Router();

appRouter.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

appRouter.use("/auth", authRouter);
