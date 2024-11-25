// import { Hono } from "hono";
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";
// import { sign } from "hono/jwt";
// import { authRouter } from "./routes/auth";

// const app = new Hono<{
//   Bindings: {
//     DATABASE_URL: string;
//     JWT_SECRET: string;
//   };
// }>();

// app.route("api/v1/user", authRouter);

// export default app;

import { Hono } from "hono";
import { authRouter } from "./routes/auth";
import { blogRouter } from "./routes/blog";
// import { bookRouter } from './routes/blog';

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.get("/", (c) => {
  return c.json({
    success: true,
    message: "Server is working.",
  });
});

app.route("/api/v1/user", authRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
