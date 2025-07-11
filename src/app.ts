import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import appRoutes from "./modules/routes/index.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(helmet());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", appRoutes);

app.use(errorHandler);

export default app;
