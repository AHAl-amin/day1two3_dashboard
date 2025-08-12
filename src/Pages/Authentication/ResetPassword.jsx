

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
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const password = watch("password");

  const onSubmit = async (data) => {
    const resetData = {
      new_password: data.password, // Match the field name from Postman
    };

    try {
      const response = await resetPassword(resetData).unwrap();
      toast.success(response?.detail || "Password reset successfully");
      console.log(response)
      navigate('/');
    } catch (error) {
      toast.error(error?.detail || "Failed to reset password");
      console.log(error)
    }
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
            Please enter a new password for next time Log In
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

        {/* Submit Button */}
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
              Processing...
            </div>
          ) : (
            "Done"
          )}
        </button>
      </form>
      <Toaster position="top-right" />
    </div>
  );
}