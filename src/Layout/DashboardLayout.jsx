

import { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineFolderOpen,
  HiOutlineCog,
  HiOutlineBell,
} from "react-icons/hi";
import { FaChartLine } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";

const navItems = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <HiOutlineViewGrid className="text-xl" />,
    rounded: "rounded-full",
    active: "bg-blue-500 text-white",
  },
  {
    path: "/dashboard/projects",
    label: "Projects",
    icon: <HiOutlineFolderOpen className="text-xl" />,
    rounded: "rounded-full",
    active: "bg-blue-500 text-white",
  },
  {
    path: "/dashboard/reports",
    label: "Report",
    icon: <FaChartLine className="text-xl" />,
    rounded: "rounded-full",
    active: "bg-blue-500 text-white",
  },
  {
    path: "/dashboard/request",
    label: "Request",
    icon: <FiMessageSquare className="text-xl" />,
    rounded: "rounded-full",
    active: "bg-blue-500 text-white",
  },
  {
    label: "Settings",
    icon: <HiOutlineCog className="text-xl" />,
    rounded: "rounded-full",
    active: "text-gray-700 hover:bg-gray-100",
    hasDropdown: true,
  },

];

export default function DashboardLayout() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Settings");
  const dropdownRef = useRef(null);
  const location = useLocation();
  // const navigate = useNavigate();

  // const token =localStorage.getItem("access_token")

  // if(!token){
  //   navigate("/")
  // }
  // else{
  //   navigate("/dashboard")
  // }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-white z-50 shadow fixed w-full">
        <div className="mx-auto container px-4 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-3 w-1/5">
            <img
              src="https://icon-library.com/images/construction-icon-png/construction-icon-png-14.jpg"
              className="h-16"
              alt="Logo"
            />
          </div>

          {/* Center: Navigation */}
          <div className="flex gap-6 w-3/5 justify-center">
            {navItems.map(({ path, label, icon, active, rounded, hasDropdown }) => {
              const isDashboardActive =
                label === "Dashboard" &&
                location.pathname.startsWith("/dashboard") &&
                !location.pathname.includes("projects") &&
                !location.pathname.includes("reports") &&
                !location.pathname.includes("request") &&
                !location.pathname.includes("settings") &&
                !location.pathname.includes("terms") &&
                !location.pathname.includes("change_password");

              return (
                <div key={label} className="relative" ref={hasDropdown ? dropdownRef : null}>
                  {hasDropdown ? (
                    <>
                      <button
                        type="button"
                        onClick={toggleDropdown}
                        className={`flex items-center gap-2 px-4 py-2 font-medium transition ${rounded} text-gray-700 hover:bg-gray-100`}
                      >
                        {icon}
                        {selectedOption}
                      </button>

                      {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-50">
                          <NavLink
                            to="/dashboard/settings"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              setSelectedOption("Account Settings");
                              setIsDropdownOpen(false);
                            }}
                          >
                            Account Settings
                          </NavLink>
                          <NavLink
                            to="/dashboard/terms"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => {
                              setSelectedOption("Terms & Condition");
                              setIsDropdownOpen(false);
                            }}
                          >
                            Terms & Condition
                          </NavLink>
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={path}
                      end={path === "/dashboard"}
                      className={({ isActive }) =>
                        `flex items-center gap-2 px-4 py-2 font-medium transition ${rounded} ${
                          isActive || isDashboardActive
                            ? active
                            : "text-gray-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      {icon}
                      {label}
                    </NavLink>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Notification & Avatar */}
          <div className="flex items-center gap-4 w-1/5 justify-end">
            <button className="relative">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              <HiOutlineBell className="text-2xl text-gray-500" />
            </button>
            <img
              src="/user-avatar.png"
              alt="User"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="bg-[#F7FBFD] flex-1 mt-24 py-6">
        <div className="container px-4 mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

