import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { hashPassword, verifyPassword } from "../utils/passwordUtils";
import { signUpInput, signinInput } from "@kanad_shee/scriptlab-common";

export const authRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Sign Up Route
authRouter.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signUpInput.safeParse(body);

    if (!success) {
      return c.json(
        {
          message: "Inputs are not correct",
          success: false,
        },
        411
      );
    }

    // Validate the fields
    if (!body.email || !body.password) {
      return c.json(
        {
          message: "All fields are mandatory.",
          success: false,
        },
        411
      );
    }

    // Hash the password using the PBKDF2 hashPassword function
    const hashedPassword = await hashPassword(body.password);

    // Store the user in the database
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword, // Store the hashed password
        name: body.name || undefined, // Include name if provided
      },
    });

    user.password = "";

    // Create JWT token
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json(
      {
        jwt: token,
        message: "Signup successful.",
        user,
      },
      201
    );
  } catch (error) {
    console.error("Signup error:", error);
    return c.json(
      {
        success: false,
        message: "An error occurred during signup.",
      },
      500
    );
  }
});

// Sign In Route
authRouter.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const { success } = signinInput.safeParse(body);

    if (!success) {
      return c.json(
        {
          message: "Inputs are not correct",
          success: false,
        },
        411
      );
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // Verify the password using the PBKDF2 verifyPassword function
    const isPasswordValid = await verifyPassword(user.password, body.password);

    if (!isPasswordValid) {
      return c.json({ error: "Invalid password" }, 401);
    }

    // Create JWT token
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt: token });
  } catch (error) {
    console.error("Signin error:", error);
    return c.json(
      {
        success: false,
        message: "An error occurred during signin.",
      },
      500
    );
  }
});

authRouter.put("/reset-password", async (c) => {
  try {
    const body = await c.req.json();

    if (!body.email || !body.password || !body.confirmPassword) {
      return c.json({
        message: "All fields are required.",
        success: false,
      });
    }

    if (body.password !== body.confirmPassword) {
      return c.json({
        message: "Both of the passwords have to be matched.",
        success: false,
      });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const presentUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!presentUser) {
      return c.json({
        success: false,
        message: "No user is available with this email.",
      });
    }

    const hashedPassword = await hashPassword(body.password);

    const updatedUser = await prisma.user.update({
      where: {
        id: presentUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return c.json(
      {
        success: true,
        message: `Password has been reset successfully for ${updatedUser.email}`,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: "Some error occurred while resetting password.",
        success: false,
      },
      500
    );
  }
});
