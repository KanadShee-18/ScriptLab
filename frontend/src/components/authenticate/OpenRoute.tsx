import React from "react";
import { Navigate } from "react-router-dom";

type ChildrenProps = {
  children: React.ReactNode;
};

function OpenRoute({ children }: ChildrenProps) {
  const token = localStorage.getItem("token");
  if (token === null) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/blog"} />;
  }
}

export default OpenRoute;
