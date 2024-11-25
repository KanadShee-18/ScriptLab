import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  try {
    const header = c.req.header("authorization") || "";

    const token = header.split(" ")[1];

    const user = await verify(token, c.env.JWT_SECRET);

    if (user.id) {
      c.set("userId", `${user.id}`);
      await next();
    } else {
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  } catch (error) {
    c.status(403);
    return c.json({
      message: "You are not authenticated.",
    });
  }
});

// create a new blog:

blogRouter.post("/createBlog", async (c) => {
  try {
    const body = await c.req.json();

    const authorId = c.get("userId");

    if (!body.title || !body.content) {
      return c.json(
        {
          message: "All fields required!",
          success: false,
        },
        411
      );
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const createdBlog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: authorId,
      },
    });

    return c.json(
      {
        message: "Blog has been created successfully.",
        success: true,
        data: createdBlog,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: "Some error occurred while creating the blog post.",
        success: false,
        error: c.error?.message,
      },
      500
    );
  }
});

// get a specific blog by its id
blogRouter.get("/blog-insider", async (c) => {
  try {
    const body = await c.req.json();

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findFirst({
      where: {
        id: body.id,
      },
    });

    if (!blog) {
      return c.json(
        {
          message: "No blog is available with this specific id.",
          success: false,
          error: c.error?.message,
        },
        404
      );
    }

    return c.json(
      {
        success: "true",
        data: blog,
        message: "Blog has been fetched successfully.",
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        message: "Some error occurred in server to get this specific blog.",
        error: c.error?.message,
      },
      411
    );
  }
});

// Update a blog:

blogRouter.put("/modify-blog", async (c) => {
  try {
    const body = await c.req.json();

    const authorId = c.get("userId");

    if (!body.id) {
      return c.json(
        {
          message: "Id is mandatory to update a blog.",
          success: false,
        },
        411
      );
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.post.findFirst({
      where: {
        id: body.id,
      },
    });

    if (!blog) {
      return c.json({
        message: "No blog is available with this id. Please recheck it.",
        success: false,
      });
    }

    const updateData: { title?: string; content?: string } = {};

    if (body.title) {
      updateData.title = body.title;
    }
    if (body.content) {
      updateData.content = body.content;
    }

    const updatedBlog = await prisma.post.update({
      where: {
        id: body.id,
        authorId: authorId,
      },
      data: updateData,
    });

    return c.json(
      {
        success: true,
        message: "Blog has been updated successfully.",
        updatedBlog,
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        message: "Some error occurred while updating the blog.",
        error: c.error?.message,
      },
      500
    );
  }
});

// Delete a blog:

blogRouter.delete("/destroy-blog", async (c) => {
  try {
    const body = await c.req.json();

    if (!body.blogId) {
      return c.json(
        {
          success: false,
          message: "Blog id is required to delete a blog.",
        },
        411
      );
    }

    const userId = c.get("userId");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const presentedBlog = await prisma.post.findFirst({
      where: {
        id: body.blogId,
        authorId: userId,
      },
    });

    if (!presentedBlog) {
      return c.json(
        {
          success: false,
          message: "Blog is not present.",
        },
        404
      );
    }

    await prisma.post.delete({
      where: {
        id: body.blogId,
      },
    });

    return c.json(
      {
        success: true,
        message: "Blog has been deleted successfully.",
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        message: "Some error occurred while deleting the blog.",
        success: false,
        error: c.error?.message,
      },
      500
    );
  }
});

// Get all blogs.
// TODO: Adding Pagination
blogRouter.get("/blogs-overview", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany();

    return c.json(
      {
        success: true,
        message: "All blogs have been fetched successfully.",
        data: {
          blogs: blogs,
          blogsLength: blogs.length,
        },
      },
      200
    );
  } catch (error) {
    return c.json(
      {
        success: false,
        message: "Some error occurred while getting all blogs.",
        error: c.error?.message,
      },
      500
    );
  }
});
