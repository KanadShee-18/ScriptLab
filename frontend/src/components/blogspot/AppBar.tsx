import slLogo from "../../assets/sllogo.png";
import { Avatar } from "./BlogCard";
import { GoBell } from "react-icons/go";
import { LuLogOut } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

export const AppBar = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/signin");
  };
  const userName = localStorage.getItem("userName");
  return (
    <div className="fixed top-0 flex items-center border-b-[1px] justify-between backdrop-blur-sm w-screen px-3 md:px-10 lg:px-20 xl:px-32 h-16 z-[100]">
      <Link to={"/"} className="hover:cursor-pointer">
        <img src={slLogo} className="w-14 aspect-square" alt="Script_Lab" />
      </Link>
      <div className="flex items-center gap-x-4 text-slate-500">
        <button
          onClick={() => navigate("/publish-blog")}
          className="px-2 py-1 text-sm font-medium text-black bg-green-300 rounded-md shadow-sm shadow-slate-900 hover:bg-slate-950 hover:text-slate-50"
        >
          Add Blog
        </button>
        <span>
          <GoBell size={24} />
        </span>
        <Avatar authorName={userName === null ? "Anonymous" : userName} />
        <LuLogOut
            title="Logout"
          size={24}
          className="transition-all duration-200 cursor-pointer hover:scale-110"
          onClick={() => handleOnClick()}
        />
      </div>
    </div>
  );
};
