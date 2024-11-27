import { useParams } from "react-router-dom";
import { useSingleBlog } from "../hooks";
import FullBlog from "../components/blogspot/FullBlog";
import { AppBar } from "../components/blogspot/AppBar";

const BlogPost = () => {
  const { id } = useParams();

  const { blog, loading } = useSingleBlog({id});

  console.log("The blog is: ", blog);
  

  return <div>
    {
        loading ? (
            <div>
                <Shimmer/>
            </div>
        ) : (
            <FullBlog content={blog?.content || ""} title={blog?.title || ""} id={blog?.id || ""} author={blog?.author || {name: "Anonymous"}}/>
        )
    }
    
  </div>;
};

const Shimmer = () => (
    <div className="w-screen min-h-screen animate-pulse">
      <AppBar />
      <div className="flex flex-col w-11/12 h-full gap-4 mx-auto mt-28 md:flex-row lg:w-3/4 md:w-10/12">
        <div className="flex flex-col w-full mx-auto md:w-3/4 lg:w-3/5 gap-y-5">
          <div className="h-8 bg-gray-300 rounded"></div>
          <div className="h-6 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
          <div className="h-48 mt-10 bg-gray-200 rounded"></div>
          <div className="mt-6 bg-gray-200 rounded h-14"></div>
          <div className="h-20 mt-4 bg-gray-200 rounded"></div>
          <div className="h-8 mt-6 bg-gray-200 rounded"></div>
        </div>
  
        <div className="w-full md:w-1/4 lg:w-2/5">
          <div className="grid min-w-full p-8 mx-auto place-content-center">
            <div className="w-24 h-8 bg-gray-300 rounded"></div>
            <div className="flex items-center mt-4 gap-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full aspect-square"></div>
              <div className="w-16 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default BlogPost;
