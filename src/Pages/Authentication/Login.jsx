import { useForm } from "react-hook-form";
import { useState } from "react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useLoginUserMutation } from "../../redux/features/baseApi";
import { toast, Toaster } from "sonner";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userInfo = {
        email: data?.email,
        password: data?.password,
      };

      const response = await loginUser(userInfo).unwrap();
      console.log(response, "loginresponse");

      localStorage.setItem("access_token", response?.access_token);
      localStorage.setItem("refresh_token", response?.refresh_token);
     

      toast.success("Login Successfully");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.detail || "Unable to login! Try again");
    }
  };



  return (
    <div className="min-h-screen flex">
      {/* Left Side - Welcome Section */}
      <Toaster position="top-right" />
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full">
          <div className="mb-10 px-8 text-center lg:text-left lg:px-32">
            <h1 className="text-4xl lg:text-[50px] font-extrabold bg-gradient-to-r from-[#3277B9] to-[#0858A6] bg-clip-text text-transparent leading-tight">
              Welcome to Your
            </h1>
            <h1 className="text-4xl lg:text-[50px] font-bold bg-gradient-to-r from-[#3277B9] to-[#0858A6] bg-clip-text text-transparent leading-tight">
              LoanSite - Assistant
            </h1>
            <p className="text-[#6E6F70] mt-4 text-lg">
              Smart, AI-driven support for real estate borrowers and private
              lenders
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co/FkMbWx0y/Layer-1.png"
              alt="Two professionals - a woman with laptop and a man with documents"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-gradient-to-b from-[#479ef3] to-[#3880c4] flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-white mb-2">
              Welcome Back!
            </h2>
            <p className="text-[#F4F4F4] text-base">Please login to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="text-gray-400" size={18} />
                </div>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={`w-full pl-12 pr-4 py-3 rounded-full bg-white text-gray-900 border-2 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 placeholder-gray-500 ${
                    errors.email ? "border-red-200" : "border-gray-200"
                  }`}
                  placeholder="Enter email address"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-800">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="text-gray-400" size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    // minLength: {
                    //   value: 6,
                    //   message: "Password must be at least 6 characters",
                    // },
                  })}
                  className={`w-full pl-12 pr-12 py-3 bg-white border-2 rounded-full text-gray-600 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 placeholder-gray-500 ${
                    errors.password ? "border-red-200" : "border-gray-200"
                  }`}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer rounded-r-full transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-800">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-white cursor-pointer">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="h-4 w-4 accent-[#0074E5] focus:ring-black border-gray-300 rounded-full"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <Link
                to="/select_method"
                className="text-blue-200 hover:text-white transition-colors underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 shadow-sm shadow-gray-800 rounded-full cursor-pointer font-semibold text-white transition duration-200 ease-in-out 
            ${
              isLoading
                ? "bg-gradient-to-r from-[#1A4773] to-[#0074E5] cursor-not-allowed"
                : "bg-gradient-to-r from-[#1A4773] to-[#0074E5] hover:scale-[1.02] active:scale-95"
            }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Logging in...
                </div>
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


