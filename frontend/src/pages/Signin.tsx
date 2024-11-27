import React, { useState } from "react";
import AuthHeading from "../components/authcore/AuthHeading";
import AuthPara from "../components/authcore/AuthPara";
import Input from "../components/Input";
import Button from "../components/Button";
import Quote from "../components/Quote";
import { quoteText2 } from "../utils/constant";
import { SignupInput } from "@kanad_shee/scriptlab-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../hooks";
import { HomeNav } from "./Home";

const Signin = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const sendSignInRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/user/signin`, postInputs);
      const { jwt, userId, userName } = response?.data;

      localStorage.setItem("token", jwt);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);
      navigate("/blog");
    } catch (error: any) {
      console.log("Signin error: ", error);

      setErrMsg(error.response.data.message);
    }
    setLoading(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostInputs((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <div>
      <HomeNav />
      <div className="grid w-full min-h-screen place-items-center">
        <div className="flex flex-col items-center md:flex-row">
          <div className="w-full mt-8 md:w-1/2 md:mt-0">
            <Quote
              text={quoteText2}
              authorName="Arianna Huffington"
              position="Founder | The Huffington Post"
            />
          </div>
          <div className="grid w-full mt-8 md:w-1/2 md:mt-0 place-items-center">
            <div className="w-full max-w-[400px] md:max-w-[500px]">
              <AuthHeading authHeading="Sign into your account" />
              <div className="flex gap-x-2">
                <AuthPara
                  authPara="Don't have an accoount?"
                  linkRoute="/signup"
                  linkText="Sign Up"
                />
              </div>
              <Input
                label="Email"
                placeholder={"mpv@example.com"}
                type="email"
                important={true}
                name="email"
                onChange={handleOnChange}
              />
              <Input
                label="Password"
                placeholder={"Enter your password"}
                type="password"
                important={true}
                name="password"
                onChange={handleOnChange}
              />
              {loading && (
                <div className="flex items-center justify-center w-full mt-3">
                  <div className="spinner"></div>
                </div>
              )}
              {errMsg && (
                <div className="flex items-center justify-center w-full mt-3">
                  <p className="text-slate-700">{errMsg}</p>
                </div>
              )}
              <Button
                btnText={"Sign In"}
                type="submit"
                forgetPassword={true}
                onClick={() => sendSignInRequest()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
