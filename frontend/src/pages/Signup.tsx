import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Quote from "../components/Quote";
import AuthHeading from "../components/authcore/AuthHeading";
import AuthPara from "../components/authcore/AuthPara";
import { quoteText } from "../utils/constant";
import { SignupInput } from "@kanad_shee/scriptlab-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../hooks";

const Signup = () => {
  const navigate = useNavigate();

  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");

  const sendSignUpRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/user/signup`,
        postInputs
      );
      const jwt = response?.data?.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blog");
    } catch (error: any) {
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
    <div className="grid w-full min-h-screen place-items-center">
      <div className="flex flex-col items-center md:flex-row">
        <div className="grid w-full mt-8 signUpBG md:w-1/2 md:mt-0 place-items-center">
          <div className="w-full max-w-[400px] md:max-w-[500px]">
            <AuthHeading authHeading="Create an account" />
            <div className="flex gap-x-2">
              <AuthPara
                authPara="Already have an accoount?"
                linkRoute="/signin"
                linkText="Login"
              />
            </div>
            <Input
              label="Username"
              placeholder={"Enter your username"}
              type="text"
              name="name"
              onChange={handleOnChange}
            />
            <Input
              label="Email"
              placeholder={"mpv@example.com"}
              type="email"
              name={"email"}
              important={true}
              onChange={handleOnChange}
            />
            <Input
              label="Password"
              placeholder={"Enter a strong password"}
              type="password"
              name={"password"}
              important={true}
              extraText={`Min Char: 6`}
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
              btnAction=""
              btnText={"Sign Up"}
              type="submit"
              forgetPassword={false}
              onClick={() => sendSignUpRequest()}
            />
          </div>
        </div>
        <div className="w-full mt-8 md:w-1/2 md:mt-0">
          <Quote
            text={quoteText}
            authorName="Luca Sinclair"
            position="CEO | Acme Corp"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
