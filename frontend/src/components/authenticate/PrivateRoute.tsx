import { Navigate } from "react-router-dom";

type ChildrenProps = {
  children: React.ReactNode;
};

function PrivateRoute({ children }: ChildrenProps) {
  const token = localStorage.getItem("token");
  if (token !== null) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/signin"} />;
  }
}

export default PrivateRoute;
