import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateBlog from "./pages/CreateBlog";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BlogView from "./pages/BlogView";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Page404 from "./pages/Page404";
import OwnBlogs from "./pages/OwnBlogs";
import "./App.css";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/own-blogs" element={<OwnBlogs />} />
          <Route path="/blogview/:id" element={<BlogView />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route path="/create" element={<CreateBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
