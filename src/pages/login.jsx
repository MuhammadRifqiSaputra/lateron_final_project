import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPanel from "../components/AuthPanel";

const EyeOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592M6.53 6.533A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.965 9.965 0 01-4.077 5.267M15 12a3 3 0 00-3-3M3 3l18 18"/>
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
);

export default function Login() {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (
      user &&
      user.email === email &&
      user.password === password
    ) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Email / password salah");
    }
  };

  return (
    <div className="h-screen w-full flex bg-white overflow-hidden font-sans">

      <div className="w-[52%] p-5 hidden md:block">
        <AuthPanel />
      </div>

      <div className="w-full md:w-[48%] flex flex-col justify-center px-12 lg:px-20 py-10">

        <h1 className="text-[32px] font-bold text-[#1B4F72] mb-2">
          Welcome Back
        </h1>

        <p className="text-[14px] text-[#2F7BAF] mb-8">
          Log in to continue your learning roadmap and track your progress.
        </p>

        <label className="text-[14px] font-semibold text-[#374151] mb-2 block">
          Username/Email
        </label>

        <input
          type="text"
          placeholder="Enter your username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
          w-full
          px-5
          py-3.5
          rounded-2xl
          mb-5
          bg-[#EEF4F8]
          border
          border-transparent
          focus:outline-none
          focus:border-[#2F7BAF]
          focus:bg-white
          transition-all
          text-[14px]
          "
        />

        <label className="text-[14px] font-semibold text-[#374151] mb-2 block">
          Password
        </label>

        <div className="relative mb-2">

          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
            w-full
            px-5
            py-3.5
            pr-12
            rounded-2xl
            bg-[#EEF4F8]
            border
            border-transparent
            focus:outline-none
            focus:border-[#2F7BAF]
            focus:bg-white
            transition-all
            text-[14px]
            "
          />

          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-[#A0AEC0]
            "
          >
            {showPass ? <EyeIcon /> : <EyeOffIcon />}
          </button>

        </div>

        <div className="flex justify-end mb-8">
          <button className="text-[13px] text-[#2F7BAF] font-medium hover:underline">
            Forgot password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="
          w-full
          py-4
          rounded-2xl
          mb-6
          bg-[#1B4F72]
          text-white
          font-bold
          text-[15px]
          hover:bg-[#163f5c]
          transition-all
          shadow-md
          "
        >
          Login
        </button>

        <p className="text-center text-[14px] text-[#6B7280]">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-[#2F7BAF] font-bold hover:underline"
          >
            Sign up
          </button>
        </p>

      </div>

    </div>
  );
}