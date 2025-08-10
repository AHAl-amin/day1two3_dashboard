import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useVarifyOtpMutation } from "../../redux/features/baseApi";
import { toast } from "sonner";

export default function OTPVerification() {
  const { method } = useParams();
  console.log(method);

  const [varifyOtp, { isLoading }] = useVarifyOtpMutation();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: ["", "", "", ""],
    },
  });

  const inputRefs = useRef([]);
  const [contact, setContact] = useState(null);

  useEffect(() => {
    if (method) {
      const storedInfo = localStorage.getItem(method);
      if (method === "email") {
        setContact({ type: "email", value: storedInfo });
      } else if (method === "phone_number") {
        setContact({ type: "phone", value: storedInfo });
      }
    }
  }, []);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    const isNumber = /^[0-9]$/.test(value);

    if (isNumber) {
      setValue(`otp.${index}`, value, { shouldValidate: true });
      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      setValue(`otp.${index}`, "", { shouldValidate: true });
    } else {
      e.target.value = "";
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (e.target.value === "") {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        setValue(`otp.${index}`, "", { shouldValidate: true });
      }
    }
  };

  const onSubmit = async (data) => {
    const otpInfo = data.otp.join("");

    try {
      const response = await varifyOtp(otpInfo).unwrap();
      console.log(response);
      toast.success("OTP Successfully matched");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const currentOtpValues = watch("otp");

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="p-8 rounded-lg w-full max-w-lg text-center">
        <div className="flex justify-center mb-6">
          <img
            src="https://i.ibb.co.com/S9fnsLp/Vector-2.png"
            alt="OTP Verification"
            className="w-[168px] h-[173px] mx-auto"
          />
        </div>
        <h2 className="text-4xl lg:text-[34px] font-extrabold text-center bg-gradient-to-r from-[#3277B9] to-[#0858A6] bg-clip-text text-transparent leading-tight">
          Verify Your {contact?.type === "email" ? "Email" : "Phone Number"}
        </h2>
        {contact?.value && (
          <p className="text-[#6E6F70] text-lg mb-8">
            Please enter the 4-digit OTP that was sent to{" "}
            <span className="font-semibold text-[#1E90FF]">
              {contact.value}
            </span>
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center justify-center gap-8">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <Controller
                  key={index}
                  control={control}
                  name={`otp.${index}`}
                  rules={{ required: true, pattern: /^[0-9]$/ }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      ref={(el) => (inputRefs.current[index] = el)}
                      onChange={(e) => handleInputChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onWheel={(e) => e.target.blur()}
                      className={`h-16 w-16 text-center  text-2xl font-bold rounded-md border-2 transition-colors duration-200
                        ${
                          errors.otp && errors.otp[index]
                            ? "border-red-500"
                            : currentOtpValues[index] !== "" ||
                              inputRefs.current[index] ===
                                document.activeElement
                            ? "border-[#1E90FF] bg-[#1E90FF1A]/10 text-black"
                            : "border-gray-300 bg-[#1E90FF1A]/10 text-gray-900"
                        }
                        focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent
                        appearance-none [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden
                      `}
                      style={{ MozAppearance: "textfield" }}
                      placeholder={
                        currentOtpValues[index] === "" ? "-" : undefined
                      }
                    />
                  )}
                />
              ))}
          </div>

          {Object.keys(errors).length > 0 && (
            <p className="text-red-500 text-sm mt-2">
              Please enter all 4 digits of the OTP.
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={` py-3 px-4 w-10/12 shadow-sm shadow-gray-800 rounded-full cursor-pointer font-semibold text-white transition duration-200 ease-in-out 
            ${
              isLoading
                ? "bg-gradient-to-r from-[#1A4773] to-[#0074E5] cursor-not-allowed"
                : "bg-gradient-to-r from-[#1A4773] to-[#0074E5] hover:scale-[1.02] active:scale-95"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Verifying...
              </div>
            ) : (
              "Verify otp"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Didn&apos;t receive OTP?{" "}
            <button
              type="button"
              className="text-[#1E90FF] cursor-pointer hover:text-[#0858A6] font-semibold"
            >
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
