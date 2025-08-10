

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { FaUserTie } from "react-icons/fa"

function ChangePassword() {
    const user = {
        name: "Angelo",
        email: "samlee@gmail.com",
        avatarUrl: "/placeholder.svg?height=80&width=80&text=User", // Using a placeholder for the avatar
    }

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    return (
        <div className=" p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <div className="max-w-5xl md:w-130 border mx-auto  rounded-lg p-6 ">
                {/* Header Section */}
                <div className="flex gap-4 w-full items-center mb-8">
                    <div>

                        <FaUserTie className="size-24 border-2 border-gray-500 p-2 rounded-full  text-gray-600" />

                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Hello {user.name}!</h1>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

                {/* Password Change Form */}
                <div className="space-y-6 md:w-100 md:ml-26">
                    {/* Current Password */}
                    <div>
                        <label htmlFor="currentPassword" className="block text-gray-700 text-sm font-medium  mb-1">
                            Enter Current Password
                        </label>
                        <div className="relative">
                            <input
                                id="currentPassword"
                                type={showCurrentPassword ? "text" : "password"}
                                className="w-full px-3 py-2 bg-blue-50 rounded-md text-gray-800 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                            >
                                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label htmlFor="newPassword" className="block text-gray-700 text-sm font-medium mb-1">
                            Enter New Password
                        </label>
                        <div className="relative">
                            <input
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                className="w-full px-3 py-2 bg-blue-50 rounded-md text-gray-800 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                aria-label={showNewPassword ? "Hide password" : "Show password"}
                            >
                                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full px-3 py-2 bg-blue-50 rounded-md text-gray-800 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                {/* Done Button */}
                <div className="mt-8">
                    <button className="w-full px-6 py-3 rounded-full bg-gradient-to-b from-[#1E90FF] to-[#305C87] cursor-pointer text-white font-medium hover:bg-blue-600 transition-colors duration-200 shadow-md">
                        Done
                    </button>
                </div>
                </div>

            </div>
        </div>
    )
}

export default ChangePassword
