import { ChangeEvent, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
type Props = {
  name?: string;
  type?: string;
  label?: string;
  placeholder?: string;
  important?: boolean;
  extraText?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  name,
  type,
  label,
  placeholder,
  important = false,
  extraText,
  onChange,
}: Props) => {
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  return (
    <div className="mt-3">
      <div className="flex flex-col w-11/12 mx-auto text-gray-800 gap-y-2 md:w-4/5">
        <label className="flex items-center font-medium">
          {label}
          {important && <sup className="text-pink-500">*</sup>}
          {extraText && <p className="ml-2 text-sm">({extraText})</p>}
        </label>
        <div
          className={`w-full ${
            type === "password" && "flex"
          } relative focus-within:outline-2 focus-within:outline-gray-500  text-slate-700 border-[1px] focus-within:shadow-sm focus-within:shadow-[#434353] border-gray-300 rounded-md`}
        >
          <input
            onChange={onChange}
            name={name}
            type={type === "password" && viewPassword ? "text" : type}
            placeholder={placeholder}
            className={`
            ${type === "password" ? "w-4/5" : "w-full"}
            
            p-2 outline-none  text-slate-700 rounded-md`}
          />
          {type === "password" && (
            <div className="absolute right-0 grid w-1/5 h-full text-xl place-items-center">
              <span
                onClick={() => setViewPassword(!viewPassword)}
                className="cursor-pointer"
              >
                {viewPassword ? <IoMdEye /> : <IoMdEyeOff />}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
