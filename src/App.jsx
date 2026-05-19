import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Generate from "./pages/generate";
import MyRoadmap from "./pages/myroadmap";
import Profile from "./pages/profile";

export default function App() {

  useEffect(() => {
    axios.get("http://localhost:3000/users")
      .then((res) => {
        console.log("API CONNECT:", res.data);
      })
      .catch((err) => {
        console.log("ERROR:", err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/my-roadmap" element={<MyRoadmap />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}