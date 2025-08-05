"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Users,
  AlertTriangle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";

const ProjectOverview = () => {
  const projects = [
    {
      id: "1",
      name: "Sunset Villa",
      address: "123 Oak Street, Austin",
      status: "In-prog",
      progress: 35,
      budgetUsed: 35,
      timeline: 35,
      loanAmount: "$500k",
      projectCount: 25,
      alertCount: 2,
      lastUpdated: "2 hr ago",
    },
    {
      id: "2",
      name: "Oakwood Residences",
      address: "123 Oak Street, Austin",
      status: "In-prog",
      progress: 55,
      budgetUsed: 55,
      timeline: 55,
      loanAmount: "$500k",
      projectCount: 35,
      alertCount: 2,
      lastUpdated: "2 hr ago",
    },
    {
      id: "3",
      name: "Hilltop Heights",
      address: "123 Oak Street, Austin",
      status: "Delayed",
      progress: 52,
      budgetUsed: 35,
      timeline: 35,
      loanAmount: "$500k",
      projectCount: 25,
      alertCount: 2,
      lastUpdated: "2 hr ago",
    },
    {
      id: "4",
      name: "Skyline Trade Tower",
      address: "123 Oak Street, Austin",
      status: "Halted",
      progress: 100,
      budgetUsed: 100,
      timeline: 100,
      loanAmount: "$500k",
      projectCount: 25,
      alertCount: 2,
      lastUpdated: "2 hr ago",
    },
    {
      id: "5",
      name: "Pineview Estates",
      address: "123 Oak Street, Austin",
      status: "Halted",
      progress: 55,
      budgetUsed: 35,
      timeline: 35,
      loanAmount: "$500k",
      projectCount: 25,
      alertCount: 2,
      lastUpdated: "2 hr ago",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In-prog":
        return "bg-blue-100 text-blue-800";
      case "Delayed":
        return "bg-orange-100 text-orange-800";
      case "Halted":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressBarColor = (status) => {
    switch (status) {
      case "In-prog":
        return "bg-blue-500";
      case "Delayed":
        return "bg-orange-500";
      case "Halted":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen ">
      <div className=" mx-auto">
        {/* Header */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-[40px] font-bold text-[#253240] mb-2">
                Project Management
              </h1>
              <p className="text-[#6E6E6E]">
                Monitor all construction loan projects in real-time
              </p>
            </div>
            <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </button>
          </div>

          {/* Search and Filter */}

          <div className="py-5 flex items-center gap-5">
            <label className="flex items-center gap-2 px-4 py-2 rounded-full shadow-md bg-white w-[300px]">
              <RiSearchLine size={20} className="text-[#BABABA]" />
              <input
                type="search"
                required
                placeholder="Search here..."
                className="text-base text-gray-700 outline-none ring-0 py-1 border-none bg-transparent w-full"
              />
            </label>

            <select
              defaultValue="Pick a color"
              className="select border-none focus:outline-none focus:ring-0 focus:border-white py-1 rounded-full"
            >
              <option disabled>Pick a color</option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Velvet</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded shadow p-6 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                {/* Left side */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-600">{project.address}</p>
                    <span
                      className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${getStatusColor(
                        project.status
                      )}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 w-11/12 gap-6 mb-4 ">
                    {["Progress", "Budget Used", "Timeline"].map(
                      (label, index) => {
                        const value =
                          index === 0
                            ? project.progress
                            : index === 1
                            ? project.budgetUsed
                            : project.timeline;

                        const barColor =
                          index === 0
                            ? getProgressBarColor(project.status)
                            : index === 1
                            ? "bg-[#F59E0B]" // Budget Used
                            : "bg-[#10B981]"; // Timeline

                        return (
                          <div key={label}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-700">
                                {label}
                              </span>
                              <span className="text-sm font-medium text-gray-900">
                                {value}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${barColor}`}
                                style={{ width: `${value}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{project.projectCount} Projects</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      <span>{project.alertCount} Alert</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Updated {project.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex flex-col items-end gap-4">
                  <div className="text-right">
                    <div className="text-[36px] font-bold text-[#1E90FF]">
                      {project.loanAmount}
                    </div>
                    <div className="text-[16px] font-medium text-[#253240]">
                      Loan Amount
                    </div>
                  </div>
                  <Link
                    to={`/dashboard/product_details/${project.id}`}
                    state={{ project }}
                    className="bg-gradient-to-r from-[#305C87] to-[#1E90FF] font-medium text-white px-4 py-2 rounded-full hover:cursor-pointer"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
