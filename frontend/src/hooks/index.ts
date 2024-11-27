import axios from "axios";
import { useEffect, useState } from "react";

interface Blog {
  title: string;
  content: string;
  id: string;
  author: {
    name: string;
  };
}

// export const blogsOverview = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [blogs, setBlogs] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`${import.meta.env.VITE_BASE_URL}/blog/blogs-overview`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         console.log("Blogs coming: ", res);

//         setBlogs(res.data?.data?.blogs);
//         setLoading(false);
//       });
//   }, []);

//   return {
//     blogs,
//     loading,
//   };
// };

export const blogsOverview = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/blog/blogs-overview`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data?.data?.blogs || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
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
      .get(`${import.meta.env.VITE_BASE_URL}/blog/blog-insider/${id}`, {
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

// export const deleteBlog = async ({ id }: { id: string }) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [deleted, setDeleted] = useState<boolean>(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     setLoading(true);

//     axios
//       .delete(`${import.meta.env.VITE_BASE_URL}/blog/destroy-blog`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           blogId: id,
//         },
//       })
//       .then((res) => {
//         if (res.data.success) {
//           setDeleted(true);
//           setLoading(false);
//         }
//       });
//   }, [id]);

//   return {
//     deleted,
//     loading,
//   };
// };



export const deleteBlog = async ({ id }: { id: string }) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/blog/destroy-blog`,
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