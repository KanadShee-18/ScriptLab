import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import OpenRoute from "./components/authenticate/OpenRoute";
import PrivateRoute from "./components/authenticate/PrivateRoute";
import BlogPost from "./pages/BlogPost";
import { Publish } from "./pages/Publish";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <div className="font-inter">
        <Routes>
          <Route
            path="/"
            element={<Home/>}
          />

          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <OpenRoute>
                <Signin />
              </OpenRoute>
            }
          />

          <Route
            path="/blog"
            element={
              <PrivateRoute>
                <Blog />
              </PrivateRoute>
            }
          />
          <Route
            path="/blog/blog-insider/:id"
            element={
              <PrivateRoute>
                <BlogPost />
              </PrivateRoute>
            }
          />
          <Route
            path="/publish-blog"
            element={
              <PrivateRoute>
                <Publish />
              </PrivateRoute>
            }
          />
          
        </Routes>
      </div>
    </>
  );
}

export default App;
