import BlogCard from "../components/blogspot/BlogCard";
import { blogsOverview } from "../hooks";
import ShimmerCard from "../components/blogspot/BlogShimmer";
import { AppBar } from "../components/blogspot/AppBar";

const Blog = () => {
  const { blogs, loading } = blogsOverview();

  console.log("blogs in blog page: ", blogs);

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
              authorName={
                blog.author.name ? `${blog.author.name}` : "Anonymous"
              }
              publishedDate="22nd Feb 2022"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
