// import { verify } from "hono/jwt";

// export function initMiddleware(app) {
//   app.use("/api/v1/blog/*", async (c, next) => {
//     try {
//       const header = c.req.header("authorization") || "";

//       const token = header.split(" ")[1];

//       const response = await verify(token, c.env.JWT_SECRET);

//       if (response.id) {
//         next();
//       } else {
//         return c.json({
//           message: "Error in authenticating",
//           success: false,
//         });
//       }
//     } catch (error) {
//       return c.json({
//         message: "Some error occurred while authentication.",
//         success: false,
//       });
//     }
//   });
// }
