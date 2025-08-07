"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { FiCalendar, FiDollarSign } from "react-icons/fi";

// Mock API function to simulate dynamic data fetching
const fetchProjectData = async () => {
  return {
    timeline: {
      startDate: "15/01/2024",
      expectedCompletion: "15/08/2024",
      lastUpdated: "10/07/2024",
    },
    financials: {
      totalLoan: 500000,
      amountUsed: 175000,
      remaining: 325000,
    },
    contractor: {
      companyName: "ABC Construction Ltd",
      contactPerson: "John Smith",
      phone: "+1 (555) 123-4567",
      license: "CON-2024-001",
    },
    permits: [
      {
        name: "Building Permit",
        status: "Approved",
        statusColor: "bg-green-100 text-green-800",
      },
      {
        name: "Electrical Permit",
        status: "Pending",
        statusColor: "bg-yellow-100 text-yellow-800",
      },
      {
        name: "Plumbing Permit",
        status: "Approved",
        statusColor: "bg-green-100 text-green-800",
      },
    ],
    photos: [1, 2, 3, 4, 5, 6], // Placeholder for photo IDs
    progress: [
      { name: "Foundation", completion: 100, barColor: "bg-green-600" },
      { name: "Framing", completion: 75, barColor: "bg-blue-600" },
      { name: "Electrical", completion: 30, barColor: "bg-yellow-600" },
      { name: "Plumbing", completion: 15, barColor: "bg-orange-600" },
    ],
  };
};

export default function ProjectDetailsTabs() {
  const [activeTab, setActiveTab] = useState("overview");
  const [projectData, setProjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "contractor", label: "Contractor" },
    { id: "permits", label: "Permits" },
    { id: "photos", label: "Photos" },
    { id: "progress", label: "Progress" },
  ];

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProjectData();
        setProjectData(data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (!projectData) {
      return (
        <div className="text-center text-gray-500">
          Error loading project data
        </div>
      );
    }

    switch (activeTab) {
      case "overview":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <FiCalendar size={24} className="text-[#253240]" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Project Timeline
                </h3>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Start Date</span>
                  <span className="font-medium text-gray-900">
                    {projectData.timeline.startDate}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Expected Completion</span>
                  <span className="font-medium text-gray-900">
                    {projectData.timeline.expectedCompletion}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium text-gray-900">
                    {projectData.timeline.lastUpdated}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <FiDollarSign size={24} />

                <h3 className="text-lg font-semibold text-gray-800">
                  Financial Summary
                </h3>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Loan</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(projectData.financials.totalLoan)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Amount Used</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(projectData.financials.amountUsed)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Remaining</span>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(projectData.financials.remaining)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "contractor":
        return (
          <div className="mt-6 bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Contractor Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Company Name</span>
                <span className="font-medium text-gray-900">
                  {projectData.contractor.companyName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contact Person</span>
                <span className="font-medium text-gray-900">
                  {projectData.contractor.contactPerson}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone</span>
                <span className="font-medium text-gray-900">
                  {projectData.contractor.phone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">License #</span>
                <span className="font-medium text-gray-900">
                  {projectData.contractor.license}
                </span>
              </div>
            </div>
          </div>
        );

      case "permits":
        return (
          <div className="mt-6 bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Permits & Approvals
            </h3>
            <div className="space-y-4">
              {projectData.permits.map((permit, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-gray-600">{permit.name}</span>
                  <span
                    className={clsx(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      permit.statusColor
                    )}
                  >
                    {permit.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case "photos":
        return (
          <div className="mt-6 bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Project Photos
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {projectData.photos.map((photo) => (
                <div
                  key={photo}
                  className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        );

      case "progress":
        return (
          <div className="mt-6 bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Project Progress
            </h3>
            <div className="space-y-6">
              {projectData.progress.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-medium text-gray-900">
                      {item.completion}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={clsx(
                        "h-3 rounded-full transition-all duration-300",
                        item.barColor
                      )}
                      style={{ width: `${item.completion}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className=" mx-auto py-8 bg-gray-50">
      {/* Tab Navigation */}
      <div className="flex items-center gap-10 justify-center bg-[#3B82F61A] px-3 shadow-md p-2 mb-8 rounded-full">
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

      {/* Tab Content */}
      <div className="transition-all duration-300 ease-in-out">
        {renderTabContent()}
      </div>
    </div>
  );
}
