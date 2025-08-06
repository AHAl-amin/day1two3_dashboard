import { useForm } from "react-hook-form";
import { Mail, Mailbox } from "lucide-react";
import { MdLocalPhone } from "react-icons/md";
import { useLocation } from "react-router-dom";

export default function ForgotPasswordForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const method = queryParams.get("method");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div className="flex flex-col items-center w-full max-w-md">
        <img
          src="https://i.ibb.co.com/svwB2Wrb/Vector-1.png"
          alt="Forgot Password"
          className="w-[168px] h-[173px] mx-auto"
        />
        <div className="py-10">
          <h1 className="text-4xl lg:text-[50px] font-extrabold text-center bg-gradient-to-r from-[#3277B9] to-[#0858A6] bg-clip-text text-transparent leading-tight">
            Forgot Password
          </h1>

          <p className="text-[20px] text-[#6E6F70] w-[450px] text-center pt-3">
            {method === "phone_number"
              ? "Enter your mobile number to receive OTP"
              : "Enter your email address to receive OTP"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          {method === "email" && (
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="text-[#1E90FF] ms-3" size={20} />
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
                  className={`w-full pl-14 py-3 shadow rounded-full bg-white text-gray-900 border-2 transition-all duration-200 placeholder-gray-500 ${
                    errors.email ? "border-red-200" : "border-gray-200"
                  }`}
                  placeholder="Enter email address"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 text-start">
                  {errors.email.message}
                </p>
              )}
            </div>
          )}

          {method === "phone_number" && (
            <div className="form-control w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MdLocalPhone className="text-[#1E90FF] ms-3" size={20} />
                </div>
                <input
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Enter a valid phone number (10-15 digits)",
                    },
                  })}
                  className={`w-full pl-14 py-3 shadow rounded-full bg-white text-gray-900 border-2 text-base transition-all duration-200 placeholder-gray-500 ${
                    errors.phoneNumber ? "border-red-200" : "border-gray-200"
                  }`}
                  placeholder="Enter mobile number"
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-500 text-start">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 shadow-sm bg-gradient-to-r from-[#1A4773] to-[#0074E5] shadow-gray-800 rounded-full cursor-pointer font-semibold text-white transition duration-200 ease-in-out"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
