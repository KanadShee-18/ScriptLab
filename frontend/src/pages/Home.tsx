import blogImg from "../assets/blog.png";
import blogImg2 from "../assets/blog2.png";
import logo from "../assets/sllogo.png";
import { LuHome } from "react-icons/lu";
import { RiBloggerLine } from "react-icons/ri";
import { GrLogin } from "react-icons/gr";
import { FaSign } from "react-icons/fa";
export const Home = () => {
  return (
    <div>
      <HomeNav />
      <section className="relative py-16 mt-24 text-white bg-gradient-to-r from-slate-500 to-blue-900">
        <div className="max-w-screen-xl px-4 mx-auto text-center">
          <h1 className="mb-4 text-4xl font-semibold">
            Welcome to <span className="text-rose-600">ScriptLab</span>
          </h1>
          <p className="mb-6 text-lg">
            Discover insightful blogs and stay updated with the latest trends.
          </p>
          <a
            href="/"
            className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-400 shadow-slate-950"
          >
            Explore Blogs
          </a>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-100 to-blue-200">
        <div className="max-w-screen-xl px-4 mx-auto text-center">
          <h2 className="mb-8 text-3xl font-semibold text-gray-700">
            Featured Blogs
          </h2>
          <div className="grid grid-cols-1 gap-8 mx-auto place-content-center sm:grid-cols-2">
            {/* Blog Card 1 */}
            <div className="overflow-hidden transition-all bg-gray-100 rounded-lg shadow-md hover:shadow-lg">
              <img
                src={blogImg}
                alt="Blog 1"
                className="object-cover w-full h-48"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  The Future of AI: How Artificial Intelligence is Changing the
                  World
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Explore the impact of artificial intelligence on various
                  industries, from healthcare to...
                </p>
                <a
                  href="/blog/1"
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800"
                >
                  Read More
                </a>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div className="overflow-hidden transition-all bg-gray-100 rounded-lg shadow-md hover:shadow-lg">
              <img
                src={blogImg2}
                alt="Blog 2"
                className="object-cover w-full h-48"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  10 Easy Ways to Improve Your Productivity
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Discover simple, effective strategies to manage your time,
                  reduce distractions, and get more done...
                </p>
                <a
                  href="/blog/2"
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-slate-100 to-green-100">
        <div className="max-w-screen-xl px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-semibold text-gray-700">
            About ScriptDaily
          </h2>
          <p className="mb-4 text-lg font-semibold text-gray-600 font-imprima">
            YourApp is a platform for discovering, reading, and sharing
            insightful blogs on a wide range of topics. Our goal is to provide
            value and knowledge through high-quality content.
          </p>
          <a
            href="/"
            className="text-lg font-semibold text-blue-600 hover:text-blue-800"
          >
            Learn More
          </a>
        </div>
      </section>

      <section className="py-16 text-white bg-gradient-to-r from-blue-900 to-slate-500">
        <div className="max-w-screen-xl px-4 mx-auto text-center">
          <h2 className="mb-4 text-3xl font-semibold">Stay Updated!</h2>
          <p className="mb-6 text-lg">
            Subscribe to our newsletter to get the latest blog updates delivered
            to your inbox.
          </p>
          <a
            href="/"
            className="px-6 py-2 font-semibold text-blue-600 bg-white rounded-full hover:bg-gray-100"
          >
            Subscribe Now
          </a>
        </div>
      </section>

      <footer className="py-8 text-center bg-gradient-to-r from-gray-200 to-green-200 ">
        <div className="max-w-screen-xl px-4 mx-auto">
          <p className="text-sm text-gray-800">
            &copy; 2024 ScriptDaily. All Rights Reserved.
          </p>
          <div className="mt-4">
            <a href="/" className="mx-2 text-gray-700 hover:text-blue-600">
              Privacy Policy
            </a>
            <a href="/" className="mx-2 text-gray-700 hover:text-blue-600">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const HomeNav = () => {
  const token = localStorage.getItem("token");
  return (
    <header className="fixed z-[100] top-0 w-screen py-4 bg-white shadow-md">
      <nav className="flex items-center justify-between max-w-screen-xl px-4 mx-auto">
        <div className="text-xl font-semibold text-gray-700">
          <a href="/" className="text-gray-700 hover:text-blue-600">
            <img src={logo} alt="SD" className="w-16 aspect-auto" />
          </a>
        </div>
        <ul className="flex space-x-6 text-gray-700">
          <li>
            <a
              href="/"
              className="flex items-center hover:text-blue-600 gap-x-2"
            >
              <LuHome title="Home" />
              <p className="hidden md:block">Home</p>
            </a>
          </li>

          <li>
            <a
              href={`${token ? "/blog" : "/"}`}
              className="flex items-center hover:text-blue-600 gap-x-2"
            >
              <RiBloggerLine title="Blogs" />
              <p className="hidden md:block">Blogs</p>
            </a>
          </li>
          {!token && (
            <>
              <li>
                <a
                  href="/signup"
                  className="flex items-center hover:text-blue-600 gap-x-2"
                >
                  <FaSign title="Signup" />
                  <p className="hidden md:block">Signup</p>
                </a>
              </li>
              <li>
                <a
                  href="/signin"
                  className="flex items-center hover:text-blue-600 gap-x-2"
                >
                  <GrLogin title="Login" />{" "}
                  <p className="hidden md:block">Login</p>
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
