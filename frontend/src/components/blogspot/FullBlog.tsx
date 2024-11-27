import React from "react";
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";

interface Blog {
  title: string;
  content: string;
  id: string;
  author: {
    name: string;
  };
}

const FullBlog = ({ title, content, author }: Blog) => {
  return (
    <div className="w-screen min-h-screen">
      <AppBar />
      
      <div className="flex flex-col w-11/12 h-full gap-4 mx-auto mt-28 md:flex-row lg:w-3/4 md:w-10/12">
        <div className="flex flex-col w-full mx-auto md:w-3/4 lg:w-3/5 gap-y-5">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>

          <p className="text-lg font-semibold text-gray-600">
            Posted On: Date not specified
          </p>

          <p className="mt-10 text-lg font-medium text-justify text-gray-500">{content}</p>
        </div>

        <div className="w-full md:w-1/4 lg:w-2/5">
          <div className="grid min-w-full p-8 mx-auto place-content-center">
            <h1 className="text-2xl font-bold text-gray-700 ">Author:</h1>

            <div className="flex items-center gap-x-3">
              <span className="min-w-fit">
              <Avatar authorName={author?.name} />
              </span>
              <p className="text-xl font-semibold text-slate-600">
                {author?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
