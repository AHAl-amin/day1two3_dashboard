import React from "react";
import { FiMapPin } from "react-icons/fi";
import { IoChevronBackSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectDetailsTabs from "./ProjectDetailsTabs";

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const project = location.state.project;
  console.log(project);

  return (
    <section>
      <div className="py-10 flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 justify-center w-[100px] hover:shadow-lg text-gray-600 hover:bg-gray-200 cursor-pointer shadow-md shadow-gray-300 border-2 border-gray-100 py-1 rounded-full"
        >
          <IoChevronBackSharp />
          Back
        </button>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[36px] text-[#253240] font-semibold">
            {project?.name}
          </h1>
          <div className="flex items-center gap-2 py-1">
            <FiMapPin size={16} />
            <p className="text-[#606060]">{project?.address}</p>
          </div>
        </div>

        <div>
          <p className="text-[36px] font-bold text-[#1E90FF]">
            {project?.loanAmount}
          </p>
          <p className="text-[16px] font-medium text-[#253240] pb-3">
            Loan Amount
          </p>
          <p
            className={`p-1 flex items-center justify-center rounded-full py-1 font-medium cursor-pointer text-white
            ${
              project?.status === "On-going"
                ? "bg-yellow-400"
                : project?.status === "Delayed"
                ? "bg-red-500"
                : project?.status === "Halted"
                ? "bg-orange-500"
                : "bg-gray-300"
            }
        `}
          >
            {project?.status}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-20 py-10">
        <div
          className="relative rounded-none shadow-md overflow-hidden"
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/DgLHm9Mw/Rectangle-161125390.png')", // Replace with your image path
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#E4EAFB]/20"></div>

          {/* Glassmorphism content */}
          <div className="relative z-10 p-10 bg-white/30 backdrop-blur-[0.5px] rounded-md text-start h-full">
            <p className="text-[#253240] text-[20px] font-medium mt-1">
              Progress
            </p>
            <h2 className="text-2xl font-bold text-[#253240] flex text-[48px] items-center gap-2 justify-start">
              {project?.projectCount}
            </h2>
          </div>
        </div>

        <div
          className="relative rounded-none shadow-md overflow-hidden"
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/TM59XPJK/Rectangle-161125391.png')", // Replace with your image path
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#E4EAFB]/20 "></div>

          {/* Glassmorphism content */}
          <div className="relative z-10 p-10 bg-white/30 backdrop-blur-[0.5px]  text-start h-full">
            <p className="text-[#253240] text-[20px] font-medium mt-1">
              Budget Used
            </p>
            <h2 className="text-2xl font-bold text-[#253240] flex text-[48px] items-center gap-2 justify-start">
              {project?.budgetUsed}
            </h2>
          </div>
        </div>

        <div
          className="relative rounded-none shadow-md overflow-hidden  "
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/hxcmHT9r/Rectangle-161125392.png')", // Replace with your image path
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#E4EAFB]/20 h-full"></div>

          {/* Glassmorphism content */}
          <div className="relative z-10 p-10 bg-white/30 backdrop-blur-[0.5px]  text-start h-full">
            <p className="text-[#253240] text-[20px] font-medium mt-1">
              Timeline
            </p>
            <h2 className="text-2xl font-bold text-[#253240] flex text-[48px] items-center gap-2 justify-start">
              {project?.timeline} %
            </h2>
          </div>
        </div>
      </div>

      {/* tab section */}
      <ProjectDetailsTabs />
    </section>
  );
};

export default ProductDetails;
