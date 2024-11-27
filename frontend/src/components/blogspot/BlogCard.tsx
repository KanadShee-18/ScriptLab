import { IoMdTime } from "react-icons/io";
import { CiSaveDown2 } from "react-icons/ci";
import { SlLike } from "react-icons/sl";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { PiTrashSimple } from "react-icons/pi";




type BlogCardProps = {
  authorName: string;
  title: string;
  content: string;
  publishedDate?: string;
  id: string;
  deleteBtn: boolean;
  onDelete?: (id: string) => void;
};

const BlogCard = ({
  authorName = "Anonymous",
  title,
  content,
  publishedDate,
  id,
  deleteBtn = false,
  onDelete,
}: BlogCardProps) => {
  return (
    <div className="cursor-pointer ">
      <Link to={`/blog/blog-insider/${id}`}>
        <div className="flex flex-row items-center mt-10 gap-x-3">
          <Avatar authorName={authorName} />
          <span className="flex items-center text-lg font-semibold gap-x-2 text-slate-500">
            {authorName} .<p className="text-sm">{publishedDate}</p>
          </span>
        </div>
        <div className="w-full mt-2 text-xl font-bold text-gray-700 text-wrap">
          {title}
        </div>
        <div className="relative mt-2 text-sm font-semibold tracking-wide text-gray-600 group font-inter">
          {content?.slice(0, 200) + "..."}
        </div>
      </Link>
      <div className="flex items-center justify-between mt-3 font-semibold text-gray-500 gap-x-2">
        <div className="flex gap-x-2">
          <IoMdTime size={24} />
          <span className="px-2 py-1 text-sm rounded-lg bg-slate-200">
            {`${Math.ceil(content?.length / 100)} minutes`} read
          </span>
        </div>
        <div className="flex items-center mr-5 text-xl gap-x-3 w-fit">
          {deleteBtn && (
            <div
              onClick={() => {
                if (onDelete) onDelete(id); // Call onDelete if provided
              }}
              className="text-red-500 cursor-pointer hover:text-red-700"
              title="Delete Blog"
            >
              <PiTrashSimple className="text-2xl" />
            </div>
          )}
          <SlLike title="Like" />
          <CiSaveDown2 />
          <BsThreeDots />
        </div>
      </div>
      <div className="w-full h-[1px] bg-slate-200 mt-4" />
    </div>
  );
};

export default BlogCard;



export const Avatar = ({ authorName }: { authorName: string }) => {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full shadow-md dark:bg-gray-500 shadow-slate-950">
      <span className="font-medium text-gray-600 dark:text-gray-50">
        {authorName ? authorName[0] : "A"}
      </span>
    </div>
  );
};
