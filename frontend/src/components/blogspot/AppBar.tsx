import slLogo from "../../assets/sllogo.png"
import { Avatar } from "./BlogCard"
import { GoBell } from "react-icons/go";

export const AppBar = () => {
    return (
        <div className="fixed top-0 flex items-center border-b-[1px] justify-between backdrop-blur-sm w-screen px-3 md:px-10 lg:px-20 xl:px-32 h-16 z-[100]">

            <div>
                <img src={slLogo}
                className="w-14 aspect-square"
                alt="Script_Lab" />
            </div>
            <div className="flex items-center gap-x-4 text-slate-500">
                <span>
                    <GoBell size={24}/>
                </span>
                <Avatar authorName="Anonymous"/>
            </div>



        </div>
    )
}