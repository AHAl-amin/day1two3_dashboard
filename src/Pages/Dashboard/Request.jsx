"use client"

import { useState } from "react"
import { Calendar, MapPin, Building, DollarSign } from "lucide-react"

const projectRequests = [
    {
        id: "1",
        displayStatus: "Accepted",
        type: "accepted",
        person: {
            name: "Sarah Jonson",
            avatarUrl: "https://i.ibb.co.com/35jgdnGk/image-7.png",
        },
        project: {
            title: "Green Valley Residential Complex",
            location: "Austin, TX",
            type: "Residential",
            budget: "10M",
        },
    },
    {
        id: "2",
        displayStatus: "Accepted",
        type: "accepted",
        person: {
            name: "Sarah Jonson",
            avatarUrl: "https://i.ibb.co.com/35jgdnGk/image-7.png",
        },
        project: {
            title: "Green Valley Residential Complex",
            location: "Austin, TX",
            type: "Residential",
            budget: "10M",
        },
    },
    {
        id: "3",
        displayStatus: "Accepted",
        type: "accepted",
        person: {
            name: "Sarah Jonson",
            avatarUrl: "https://i.ibb.co.com/35jgdnGk/image-7.png",
        },
        project: {
            title: "Green Valley Residential Complex",
            location: "Austin, TX",
            type: "Residential",
            budget: "10M",
        },
    },
    {
        id: "4",
        displayStatus: "Pending",
        type: "pending",
        person: {
            name: "Sarah Jonson",
            avatarUrl: "https://i.ibb.co.com/35jgdnGk/image-7.png",
        },
        project: {
            title: "Green Valley Residential Complex",
            location: "Austin, TX",
            type: "Residential",
            budget: "10M",
        },
    },
    {
        id: "5",
        displayStatus: "Pending",
        type: "pending",
        person: {
            name: "Sarah Jonson",
            avatarUrl: "https://i.ibb.co.com/35jgdnGk/image-7.png",
        },
        project: {
            title: "Green Valley Residential Complex",
            location: "Austin, TX",
            type: "Residential",
            budget: "10M",
        },
    },
    {
        id: "6",
        displayStatus: "Pending",
        type: "pending",
        person: {
            name: "Sarah Jonson",
            avatarUrl: "https://i.ibb.co.com/35jgdnGk/image-7.png",
        },
        project: {
            title: "Green Valley Residential Complex",
            location: "Austin, TX",
            type: "Residential",
            budget: "10M",
        },
    },
]

function Request() {
    const [activeTab, setActiveTab] = useState("Accept")

    const filteredRequests = projectRequests.filter((request) => {
        if (activeTab === "Accept") {
            return request.type === "accepted"
        } else {
            return request.type === "pending"
        }
    })

    return (
        <div className="min-h-screen p-4 md:p-0 ">
            <div className="rounded-lg  p-6">
                <div className="flex justify-center  mb-6">
                    <div className="flex  bg-[#1E90FF1A] rounded-full p-1">
                        <button
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${activeTab === "Accept" ? "bg-[#1E90FF] text-white shadow-sm" : "text-gray-700 hover:bg-[#1E90FF1A]"
                                }`}
                            onClick={() => setActiveTab("Accept")}
                        >
                            Accept
                        </button>
                        <button
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer ${activeTab === "Pending" ? "bg-[#1E90FF] text-white shadow-sm" : "text-gray-700 hover:bg-[#1E90FF1A]"
                                }`}
                            onClick={() => setActiveTab("Pending")}
                        >
                            Pending
                        </button>
                    </div>
                </div>

                <h1 className="text-2xl font-semibold text-gray-800 mb-6">Project Request</h1>

                <div className="space-y-4">
                    {filteredRequests.map((request) => (
                        <div key={request.id} className="bg-white border border-gray-200 rounded-lg md:p-10 p-4 flex flex-col relative">
                            <div className="flex items-start sm:items-center flex-grow">
                                <div className="flex-grow">
                                    <div className=" flex gap-2">
                                        <img
                                            src={request.person.avatarUrl || "/placeholder.svg"}
                                            alt={`Avatar of ${request.person.name}`}
                                            className="w-10 h-10 rounded-full mr-4 flex-shrink-0"
                                        />
                                        <div>
                                            <p className="text-2xl font-semibold text-gray-900">{request.person.name}</p>
                                        <div className="flex items-center text-gray-600 text-lg mt-1">
                                            <Calendar className="w-4 h-4 mr-1" />
                                            <span>{request.person.name}</span>
                                        </div>
                                        </div>
                                    </div>
                                    <a href="#" className="text-[#1E90FF]  text-3xl font-medium mt-2 block">
                                        {request.project.title}
                                    </a>
                                    <div className="grid grid-cols-1 gap-2 mt-3 text-gray-700 text-xl">
                                        <div className="flex items-center">
                                            <MapPin className="w-6 h-6 mr-2 text-gray-500" />
                                            <span>{request.project.location}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <Building className="w-6 h-6 mr-2 text-gray-500" />
                                            <span>{request.project.type}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <DollarSign className="w-6 h-6 mr-2 text-gray-500" />
                                            <span>{request.project.budget}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {activeTab === "Accept" ? (
                                <div className="absolute top-4 right-4">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[18px] font-medium bg-green-100 text-green-800">
                                        {request.displayStatus}
                                    </span>
                                </div>
                            ) : (
                                <div className="flex justify-center gap-3 mt-4 pt-4  border-gray-100">
                                    <button className="px-4 py-2 text-sm md:w-60 cursor-pointer rounded-full font-medium border border-red-400 text-red-600 hover:bg-red-50 transition-colors duration-200">
                                        Decline
                                    </button>
                                    <button className="px-4 py-2 text-sm md:w-60  cursor-pointer rounded-full  font-medium bg-gradient-to-b from-[#1E90FF] to-[#305C87] text-white  transition-colors duration-200">
                                        Accept
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Request
