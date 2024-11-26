import { useNavigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { FormEvent } from "react";

type Props = {
  btnText?: String;
  btnAction?: string;
  type?: "button" | "submit" | "reset";
  forgetPassword?: boolean;
  onSubmit?: (e: FormEvent<HTMLButtonElement>) => void;
  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
};

const Button = ({
  btnAction,
  btnText,
  type = "submit",
  forgetPassword = false,
  onSubmit,
  onClick,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className="w-11/12 mx-auto md:w-4/5">
      <button
        onSubmit={onSubmit}
        type={type}
        onClick={onClick}
        className="w-full py-2 mt-8 text-center rounded-md md:py-3 bg-slate-800 text-slate-50 hover:bg-slate-700 hover:cursor-pointer"
      >
        {btnText}
      </button>
      {forgetPassword && (
        <span className="flex items-center justify-end gap-2 mt-2 ml-auto text-sm font-medium w-fit text-slate-700 group hover:cursor-pointer hover:underline">
          Forget Password ?{" "}
          <p
            className={`group-hover:visible group-hover:animate-pulse group-hover:translate-x-2 transition-transform duration-200`}
          >
            <FaArrowRightLong size={14} />
          </p>
        </span>
      )}
    </div>
  );
};

export default Button;
