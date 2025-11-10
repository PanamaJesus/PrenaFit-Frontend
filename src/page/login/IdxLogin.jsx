import React, { useState } from "react";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import "./login.css"; // <-- nuevo CSS pequeño

export default function IdxLogin() {
  const [type, setType] = useState("signIn");

  const handleOnClick = (text) => {
    if (text !== type) setType(text);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f5f7] p-6">
      <div
        className={`container-login bg-white rounded-xl shadow-2xl transition-all duration-700 ${
          type === "signUp" ? "right-panel-active" : ""
        }`}
      >
        {/* Sign Up */}
        <div className="form-animation sign-up">
          <SignUpForm />
        </div>

        {/* Sign In */}
        <div className="form-animation sign-in">
          <SignInForm />
        </div>

        {/* OVERLAY */}
        <div className="overlay-container-login">
          <div className="overlay-login flex">
            
            {/* Left Panel */}
            <div className="overlay-panel-login overlay-left">
              <h1 className="text-4xl font-bold">Welcome Back!</h1>
              <p className="text-sm mt-3">
                To keep connected with us please login with your personal info
              </p>

              <button
                className="mt-5 px-6 py-2 border border-white rounded-full 
                hover:bg-white hover:text-pink-600 transition font-bold"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>

            {/* Right Panel */}
            <div className="overlay-panel-login overlay-right">
              <h1 className="text-4xl font-bold">Hello, Friend!</h1>
              <p className="text-sm mt-3">
                Enter your personal details and start your journey with us
              </p>

              <button
                className="mt-5 px-6 py-2 border border-white rounded-full 
                hover:bg-white hover:text-pink-600 transition font-bold"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
