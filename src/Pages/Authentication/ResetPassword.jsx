import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdLockOutline } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import resetPass from '../../../public/img/resetpassword.png';
import { useResetPasswordMutation } from "../../redux/features/baseApi";
import { toast, Toaster } from "sonner";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [resetPassword] =useResetPasswordMutation()
  
  const password = watch("password");

  const onSubmit = (data) => {
    console.log("New password:", data.password);
    toast.success("/Password change successfully")
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div>
        <img
          src={resetPass}
          alt="Reset"
          className="w-20 h-20 mx-auto"
        />
        <div className="py-10">
          <h1 className="text-4xl lg:text-[50px] font-extrabold text-center bg-gradient-to-r from-[#3277B9] to-[#0858A6] bg-clip-text text-transparent leading-tight">
            Create a new password
          </h1>
          <p className="text-[20px] text-[#6E6F70] md:w-[650px] text-center pt-3">
           WelcoPlease enter a new password for next time Log Inme Back!
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md w-full">
        {/* New Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", {
              required: "Password is required",
             
            })}
            className="w-full pl-10 pr-10 py-3 bg-blue-50 border-2 rounded-full text-gray-600 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 placeholder-gray-500 border-gray-200"
            placeholder="Enter new password"
          />
          <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full pl-10 pr-10 py-3 bg-blue-50 border-2 rounded-full text-gray-600 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all duration-200 placeholder-gray-500 border-gray-200"
            placeholder="Confirm new password"
          />
          <MdLockOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            className="mr-2 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="rememberMe" className="text-gray-700">Remember me</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#1A4773] to-[#0074E5] cursor-pointer text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
        >
          Done
        </button>
      </form>
      <Toaster position="top-right"/>
    </div>
  );
}