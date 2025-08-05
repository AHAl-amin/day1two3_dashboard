import { Outlet, NavLink } from "react-router-dom";
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
    active: "bg-blue-100 text-blue-700",
  },
  {
    path: "/dashboard/report",
    label: "Report",
    icon: <FaChartLine className="text-xl" />,
    rounded: "rounded-full",
    active: "bg-blue-100 text-blue-700",
  },
  {
    path: "/dashboard/request",
    label: "Request",
    icon: <FiMessageSquare  className="text-xl" />,
    rounded: "rounded-full",
    active: "bg-blue-100 text-blue-700",
  },
  {
    path: "/dashboard/settings",
    label: "Settings",
    icon: <HiOutlineCog className="text-xl" />,
    rounded: "rounded-full",
    active: "bg-blue-100 text-blue-700",
  },
];

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
   
<div className="bg-white shadow-lg shadow-gray-900">
  <div className="mx-auto container px-4 py-4 flex items-center justify-between">
    {/* Left: Logo */}
    <div className="flex items-center gap-3 w-1/5">
      <img src="https://icon-library.com/images/construction-icon-png/construction-icon-png-14.jpg" className="h-16" alt="Logo" />
    </div>

    {/* Center: Navigation */}
    <div className="flex gap-6 w-3/5 justify-center">
      {navItems.map(({ path, label, icon, active, rounded }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 font-medium transition ${rounded} ${
              isActive ? active : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          {icon}
          {label}
        </NavLink>
      ))}
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
      <div className="bg-[#F7FBFD] flex-1 py-6">
        <div className="container px-4 mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
