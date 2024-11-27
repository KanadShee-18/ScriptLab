import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface Blog {
  title: string;
  content: string;
  id: string;
  author: {
    name: string;
  };
}

export const blogsOverview = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${BASE_URL}/api/v1/blog/blogs-overview`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data?.data?.blogs || [];
  } catch (error) {
    // console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const useSingleBlog = ({ id }: { id?: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<Blog>();
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/api/v1/blog/blog-insider/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBlog(res?.data?.data);
        setLoading(false);
      });
  }, [id]);

  return {
    blog,
    loading,
  };
};

export const deleteBlog = async ({ id }: { id: string }) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/blog/destroy-blog`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          blogId: id,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
