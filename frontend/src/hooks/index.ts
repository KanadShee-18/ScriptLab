import axios from "axios";
import { useEffect, useState } from "react";

export const blogsOverview = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/blog/blogs-overview`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Blogs coming: ", res);

        setBlogs(res.data?.data?.blogs);
        setLoading(false);
      });
  }, []);

  return {
    blogs,
    loading,
  };
};
