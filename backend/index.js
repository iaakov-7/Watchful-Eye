import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router as alertsRouter } from "./routes/alerts.routes.js";
import { router as authRouter } from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/alerts", alertsRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);
app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`),
);
