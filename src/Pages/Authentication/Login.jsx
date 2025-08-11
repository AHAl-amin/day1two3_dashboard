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

      toast.success("Successfully logged in");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.data?.detail || "Unable to login! Try again");
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


// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { MdLockOutline } from "react-icons/md";
// import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
// import resetPass from '../../../public/img/resetpassword.png';
// import { useResetPasswordMutation } from "../../redux/features/baseApi";
// import { toast } from "sonner";

// export default function ResetPassword() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors }, watch } = useForm();
//   const [resetPassword, { isLoading }] = useResetPasswordMutation();
  
//   const password = watch("password");

//   const onSubmit = async (data) => {
//     if (data.password !== data.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await resetPassword({
//         new_password: data.password
//       }).unwrap();
      
//       toast.success("Password reset successfully!");
//       navigate('/login');
//     } catch (error) {
//       toast.error("Failed to reset password. Please try again.");
//       console.error("Reset password error:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
//       <div>
//         <img
//           src={resetPass}
//           alt="Reset"
//           className="w-20 h-20 mx-auto"
//         />
//         <div className="py-10">
//           <h1 className="text-4xl lg:text-[50px] font-extrabold text-center bg-gradient-to-r from-[#3277B9] to-[#0858A6] bg-clip-text text-transparent leading-tight">
//             Create a new password
//           </h1>
//           <p className="text-[20px] text-[#6E6F70] md:w-[650px] text-center pt-3">
//             Please enter a new password for next time Log In
//           </p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md w-full">
//         {/* New Password Input */}
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             {...register("password", {
//               required: "Password is required",
            
//             })}
//             className="w-full pl-10 pr-10 py-3 bg-blue-50 border-2 rounded-full text-gray-600 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 placeholder-gray-500 border-gray-200"
//             placeholder="Enter new password"
//           />
//           <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
//           >
//             {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
//           </button>
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//           )}
//         </div>

//         {/* Confirm Password Input */}
//         <div className="relative">
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             {...register("confirmPassword", {
//               required: "Please confirm your password",
//               validate: (value) =>
//                 value === password || "Passwords do not match",
//             })}
//             className="w-full pl-10 pr-10 py-3 bg-blue-50 border-2 rounded-full text-gray-600 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 placeholder-gray-500 border-gray-200"
//             placeholder="Confirm new password"
//           />
//           <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <button
//             type="button"
//             onClick={() => setShowConfirmPassword(!showConfirmComedyPassword)}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
//           >
//             {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
//           </button>
//           {errors.confirmPassword && (
//             <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
//           )}
//         </div>

//         {/* Remember Me Checkbox */}
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id="rememberMe"
//             className="mr-2 text-blue-600 focus:ring-blue-500"
//           />
//           <label htmlFor="rememberMe" className="text-gray-700">Remember me</label>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`w-full py-3 bg-gradient-to-r from-[#1A4773] to-[#0074E5] cursor-pointer text-white rounded-full font-semibold hover:bg-blue-700 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//         >
//           {isLoading ? 'Processing...' : 'Done'}
//         </button>
//       </form>
//     </div>
//   );
// }