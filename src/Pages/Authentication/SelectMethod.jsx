import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import { BsChat } from "react-icons/bs";
import { useState } from "react";

export default function SelectMethod() {
  const [selectedMethod, setSelectedMethod] = useState("email");
  const navigate = useNavigate();

  const handleSelect = (method) => {
    setSelectedMethod(method);
    navigate({
      pathname: "/verification",
      search: `?method=${method}`,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <div>
        <img
          src="https://i.ibb.co.com/svwB2Wrb/Vector-1.png"
          alt="Reset"
          className="w-[168px] h-[173px] mx-auto"
        />
        <div className="py-10">
          <h1 className="text-4xl lg:text-[50px] font-extrabold text-center bg-gradient-to-r from-[#3277B9] to-[#0858A6] bg-clip-text text-transparent leading-tight">
            Forgot Password
          </h1>
          <p className="text-[20px] text-[#6E6F70] w-[450px] text-center pt-3">
            Select which contact details should we use to reset your password
          </p>
        </div>
      </div>

      <div className="space-y-4 max-w-md w-full">
        {/* Email Option */}
        <div
          onClick={() => handleSelect("email")}
          className={`flex items-center gap-3 p-4 w-full font-medium rounded-full cursor-pointer transition-colors duration-200 
            ${
              selectedMethod === "email"
                ? "bg-blue-100 text-[#1E90FF]"
                : "bg-blue-50 text-[#1E90FF] hover:bg-blue-100"
            }`}
        >
          <div className="bg-white p-2 rounded-full">
            <Mail className="h-5 w-5" />
          </div>
          Via Email
        </div>

        {/* SMS Option */}
        <div
          onClick={() => handleSelect("phone_number")}
          className={`flex items-center gap-3 p-4 w-full font-medium rounded-full cursor-pointer transition-colors duration-200 
            ${
              selectedMethod === "phone_number"
                ? "bg-blue-100 text-[#1E90FF]"
                : "bg-blue-50 text-[#1E90FF] hover:bg-blue-100"
            }`}
        >
          <div className="bg-white p-2 rounded-full">
            <BsChat className="h-5 w-5" />
          </div>
          Via SMS
        </div>
      </div>
    </div>
  );
}
