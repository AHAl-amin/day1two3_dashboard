import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { MdLocalPhone } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../../redux/features/baseApi";
import { toast, Toaster } from "sonner";

export default function ForgotPasswordForm() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // const method = queryParams.get("method");
  const { method } = useParams();

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);

    if (data?.email) {
      localStorage.setItem("email", data.email);
    } else if (data?.phone_number) {
      localStorage.setItem("phone_number", data.phone_number);
    }

    try {
      const response = await verifyEmail(data).unwrap();
      console.log(response);
      navigate(`/otp_validation/${method}`);
    } catch (error) {
      console.log(error);
    }
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
                  {...register("phone_number", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Enter a valid phone number (10-15 digits)",
                    },
                  })}
                  className={`w-full pl-14 py-3 shadow rounded-full bg-white text-gray-900 border-2 text-base transition-all duration-200 placeholder-gray-500 ${
                    errors.phone_number ? "border-red-200" : "border-gray-200"
                  }`}
                  placeholder="Enter mobile number"
                />
              </div>
              {errors.phone_number && (
                <p className="mt-1 text-sm text-red-500 text-start">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
          )}

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
                Sending OTP
              </div>
            ) : (
              "Sending OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
