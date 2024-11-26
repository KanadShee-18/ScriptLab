import { Hono } from "hono";
import { authRouter } from "./routes/auth";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })
);

app.get("/", (c) => {
  return c.json({
    success: true,
    message: "Server is working.",
  });
});

app.route("/api/v1/user", authRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
