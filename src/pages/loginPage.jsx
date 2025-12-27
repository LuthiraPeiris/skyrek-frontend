import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function login() {
    console.log("Login button clicked");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
        email: email,
        password: password,
      });
      console.log(res);

      if(res.data.role == "admin"){
        //window.location.href = "/admin";
        navigate("/admin");
      } else {
        //window.location.href = "/";
        navigate("/");
      }

      toast.success("Login successful!");

    } catch (error) {

      toast.error("Login failed. Please check your credentials and try again.");

      console.error("Error during login:");
      // Axios error may include response, request, and config
      if (error.response) {
        // Server responded with a status outside 2xx
        console.error("Response status:", error.response.status);
        console.error("Response data:", error.response.data);
        if (error.response.status === 404) {
          console.error(
            "404: Endpoint not found — check that the backend route and port are correct and the server is running. Requested URL:",
            error.config?.url
          );
        }
      } else if (error.request) {
        // Request made but no response received
        console.error(
          "No response received. Is the backend running?",
          error.request
        );
      } else {
        // Something happened setting up the request
        console.error("Request setup error:", error.message);
      }
      console.error("Full error:", error);
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/bg.jpg')] bg-center bg-cover bg-no-repeat flex">
      <div className="w-[50%] h-full flex justify-center items-center flex-col p-[50px]">
        <img
          src="/laptoplogo.png"
          alt="logo"
          className="w-[200px] h-[200px] mb-5 object-cover"
        />
        <h1 className="text-[50px] text-gold text-shadow-2xs text-center font-bold">
          Plug in. Power Up. Play Hard
        </h1>
        <p className="text-[30px] text-white italic">
          Your Ultimate Destination for Gaming Gear
        </p>
      </div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[600px] backdrop-blur-lg shadow-2xl rounded-xl flex flex-col justify-center items-center p-[30px]">
          <h1 className="text-[40px] font-bold mb-5 text-white text-shadow-white">
            Login
          </h1>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="your email"
            className="w-full h-[50px] mb-5 rounded-lg border border-accent p-2.5 text-[20px] focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="your password"
            className="w-full h-[50px] mb-3 rounded-lg border border-accent p-2.5 text-[20px] focus:outline-none focus:ring-2 focus:ring-gold"
          />
          <p className="text-white w-full mb-5 text-right">
            Forget your password?
            <Link to="/forgot-password" className="text-gold italic">
              Reset here
            </Link>
          </p>
          <button
            onClick={login}
            className="w-full h-[50px] bg-accent text-white font-bold text-[20px] rounded-lg border-2 border-accent hover:bg-transparent hover:text-accent"
          >
            Login
          </button>
          <p className="text-white">
            Don't have an account?
            <Link to="/register" className="text-gold italic">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
