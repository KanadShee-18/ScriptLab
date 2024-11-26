import { Link } from "react-router-dom";

type Props = {
  authPara?: string;
  linkText?: string;
  linkRoute?: string;
};

const AuthPara = ({ authPara, linkRoute, linkText }: Props) => {
  return (
    <div className="flex items-center justify-center w-full mt-3 text-center gap-x-3 ">
      <p className="font-medium w-fit text-slate-500 font-poppins">{authPara}</p>
      <Link
        className="underline hover:text-blue-600"
        to={linkRoute ? linkRoute : "/"}
      >
        {linkText}
      </Link>
    </div>
  );
};

export default AuthPara;
