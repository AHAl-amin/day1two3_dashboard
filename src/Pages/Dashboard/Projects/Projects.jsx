

import { useState } from "react";
import { Users, AlertTriangle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import clsx from "clsx";

const Projects = () => {
    const [activeTab, setActiveTab] = useState("active");

    const projects = [
        {
            id: "1",
            name: "Sunset Villa",
            address: "123 Oak Street, Austin",
            status: "On-going",
            progress: 35,
            budgetUsed: 35,
            timeline: 35,
            loanAmount: "$500k",
            projectCount: 25,
            alertCount: 2,
            lastUpdated: "2 hr ago",
            photos: ["/placeholder1.jpg", "/placeholder2.jpg"], // Placeholder photos
        },
        {
            id: "2",
            name: "Oakwood Residences",
            address: "123 Oak Street, Austin",
            status: "On-going",
            progress: 55,
            budgetUsed: 55,
            timeline: 55,
            loanAmount: "$500k",
            projectCount: 35,
            alertCount: 2,
            lastUpdated: "2 hr ago",
            photos: ["/placeholder3.jpg", "/placeholder4.jpg"],
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
            photos: ["/placeholder5.jpg", "/placeholder6.jpg"],
        },
        {
            id: "4",
            name: "Skyline Trade Tower",
            address: "123 Oak Street, Austin",
            status: "Completed",
            progress: 100,
            budgetUsed: 100,
            timeline: 100,
            loanAmount: "$500k",
            projectCount: 25,
            alertCount: 2,
            lastUpdated: "2 hr ago",
            photos: ["/placeholder7.jpg", "/placeholder8.jpg"],
        },
        {
            id: "5",
            name: "Pineview Estates",
            address: "123 Oak Street, Austin",
            status: "Completed",
            progress: 55,
            budgetUsed: 35,
            timeline: 35,
            loanAmount: "$500k",
            projectCount: 25,
            alertCount: 2,
            lastUpdated: "2 hr ago",
            photos: ["/placeholder9.jpg", "/placeholder10.jpg"],
        },
    ];

    const tabs = [
        
        { id: "active", label: "Active" },
        { id: "completed", label: "Completed" },
        { id: "delayed", label: "Delayed" },
    ];

    const getStatusColor = (status) => {
        switch (status) {
           
            case "Delayed":
                return "bg-orange-100 text-orange-800";
           
            case "Completed":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getProgressBarColor = (status) => {
        switch (status) {
           
            case "Delayed":
                return "bg-orange-500";
           
            case "Completed":
                return "bg-green-500";
            default:
                return "bg-gray-500";
        }
    };

    // Filter projects based on active tab
    const filteredProjects = projects.filter((project) => {
        
        if (activeTab === "active") return project.status === "On-going" || project.status === "Halted";
        if (activeTab === "completed") return project.status === "Completed";
        if (activeTab === "delayed") return project.status === "Delayed";
        return false;
    });

    return (
        <div className="min-h-screen">
            <div className="mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-[40px] font-bold text-[#253240]">
                        Active Projects
                    </h1>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-4 justify-center bg-[#3B82F61A] px-3 shadow-md p-2 mb-8 rounded-full">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                "flex-1 px-4 py-3 text-[16px] font-medium rounded-full transition-all duration-300",
                                activeTab === tab.id
                                    ? "bg-gradient-to-b from-[#1E90FF] to-[#305C87] text-white shadow-md"
                                    : "text-gray-600 hover:text-gray-900 cursor-pointer"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Project Cards */}
                <div className="space-y-4 mb-8">
                    {filteredProjects.length === 0 ? (
                        <div className="text-center text-gray-500">
                            No projects found for this category.
                        </div>
                    ) : (
                        filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white rounded shadow p-6 cursor-pointer"
                            >
                                <div className="flex justify-between items-start">
                                    
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

                                        <div className="grid grid-cols-3 w-11/12 gap-6 mb-4">
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
                                                                ? "bg-[#F59E0B]"
                                                                : "bg-[#10B981]";

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

                                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
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
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Projects;