import { ChangeEvent, useState } from "react";
import { AppBar } from "../components/blogspot/AppBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../hooks";

interface PublishInputs {
  title: string;
  content: string;
}

export const Publish = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState<boolean>(false);
  const [publishInputs, setPublishInputs] = useState<PublishInputs>({
    title: "",
    content: "",
  });

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setPublishInputs((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleOnClick = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/blog/createBlog`,
        publishInputs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success) {
        navigate("/blog");
      }
    } catch (error: any) {
      alert(`${error.response.data.message}`);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div>
        <Shimmer />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen">
      <AppBar />
      <div className="w-screen h-screen">
        <div className="flex flex-col w-11/12 h-full gap-4 mx-auto mt-28 lg:w-3/5 xl:w-1/2 md:w-10/12 ">
          <div className="flex items-center w-full gap-x-7">
            <span className="flex items-end text-6xl font-bold text-gray-600">
              Title:
            </span>
            <div className="flex w-full items-end h-full border-b-[1px] border-b-slate-400">
              <input
                type="text"
                name="title"
                onChange={handleOnChange}
                placeholder="Enter a catchy title"
                className="w-full h-full px-4 pb-2 text-xl text-gray-600 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-full gap-x-7">
            <span className="flex items-end ml-3 text-2xl font-semibold text-gray-500 ">
              Content:
            </span>
            <div className="flex items-end w-full h-full p-6 pt-0 mt-4">
              <textarea
                name="content"
                onChange={handleOnChange}
                placeholder="Enter your blog here:"
                className="w-full font-medium font-imprima h-full px-4 py-3 pb-2 text-xl text-gray-600 outline-none scrollbar-hide border-[1px] border-slate-300 min-h-[500px]"
              />
            </div>
          </div>

          <button
            onClick={() => handleOnClick()}
            className="w-[200px] py-2 mx-auto tracking-wide text-center bg-gray-800 rounded-md text-slate-50 hover:bg-gray-700"
          >
            Publish Blog
          </button>
        </div>
      </div>
    </div>
  );
};

const Shimmer = () => (
  <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
    <div className="relative w-11/12 lg:w-3/5 xl:w-1/2 md:w-10/12">
      <div className="animate-pulse">
        <div className="w-3/4 h-12 mb-6 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-10 mb-4 bg-gray-300 rounded"></div>
        <div className="w-full h-64 mb-6 bg-gray-300 rounded"></div>
        <div className="w-1/3 h-10 mx-auto bg-gray-300 rounded"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-700">Publishing...</h1>
      </div>
    </div>
  </div>
);
