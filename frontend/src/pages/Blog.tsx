// import BlogCard from "../components/blogspot/BlogCard";
// import { blogsOverview } from "../hooks";
// import ShimmerCard from "../components/blogspot/BlogShimmer";
// import { AppBar } from "../components/blogspot/AppBar";

// const Blog = () => {
//   const { blogs, loading } = blogsOverview();
//   const userId = localStorage.getItem("userId");

//   console.log("blogs in blog page: ", blogs);

//   return (
//     <div>
//       <AppBar />

//       {loading ? (
//         <div className="grid w-11/12 grid-cols-1 gap-6 mx-auto mt-20 md:w-4/5 lg:w-3/4 xl:w-1/2">
//           {Array.from({ length: 6 }).map((_, index) => (
//             <ShimmerCard key={index} />
//           ))}
//         </div>
//       ) : (
//         <div className="w-11/12 mx-auto mt-20 md:w-4/5 lg:w-3/4 xl:w-1/2">
//           {blogs.map((blog: any, index) => (
//             <BlogCard
//               id={blog.id}
//               key={index}
//               content={blog.content}
//               title={blog.title}
//               authorName={
//                 blog.author.name ? `${blog.author.name}` : "Anonymous"
//               }
//               deleteBtn={userId === blog.authorId}
//               publishedDate="22nd Feb 2022"
             
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Blog;


import { useState, useEffect } from "react";
import BlogCard from "../components/blogspot/BlogCard";
import { blogsOverview, deleteBlog } from "../hooks";
import ShimmerCard from "../components/blogspot/BlogShimmer";
import { AppBar } from "../components/blogspot/AppBar";

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = localStorage.getItem("userId");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const fetchedBlogs = await blogsOverview();
      setBlogs(fetchedBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this blog?"
      );
      if (!confirmDelete) return;

      const result = await deleteBlog({ id });
      if (result.success) {
        alert("Blog deleted successfully!");
        // Remove the deleted blog from the state
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete the blog. Please try again.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <AppBar />
      {loading ? (
        <div className="grid w-11/12 grid-cols-1 gap-6 mx-auto mt-20 md:w-4/5 lg:w-3/4 xl:w-1/2">
          {Array.from({ length: 6 }).map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      ) : (
        <div className="w-11/12 mx-auto mt-20 md:w-4/5 lg:w-3/4 xl:w-1/2">
          {blogs.map((blog: any, index) => (
            <BlogCard
              id={blog.id}
              key={index}
              content={blog.content}
              title={blog.title}
              authorName={blog.author.name || "Anonymous"}
              deleteBtn={userId === blog.authorId}
              publishedDate="22nd Feb 2022"
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
