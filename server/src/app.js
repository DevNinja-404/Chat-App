import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: [`${process.env.CORS_ORIGIN}`],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "30kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes:
import userRouter from "./routes/auth.routes.js";
import contactRouter from "./routes/contact.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/contacts", contactRouter);

// Handling Error Globally:
app.use((err, req, res, next) => {
  console.log(err);

  err = err ? err.toString() : "Something went wrong";

  console.log(err);

  res
    .status(err.status || 500)
    .json({ status: "error", statusCode: 500, message: err });
});

export default app;
