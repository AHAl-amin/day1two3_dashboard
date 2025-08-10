import { FaUserTie } from "react-icons/fa"
import { Link } from "react-router-dom"

function Settings() {
    const user = {
        name: "Angelo",
        email: "samlee@gmail.com",
        phone: "123 456 785",
        avatarUrl: "/placeholder.svg?height=80&width=80",
    }

    return (
        <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto rounded-lg  shadow-md p-6">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
                    <div className="flex items-center mb-4 gap-4 sm:mb-0">
                        <div>

                            <FaUserTie className="size-24 border-2 border-gray-500 p-2 rounded-full  text-gray-600" />

                        </div>

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Hello {user.name}!</h1>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>
                    <button className="px-6 py-2 rounded-full bg-[#1E90FF1A]0 text-white font-medium bg-gradient-to-b from-[#1E90FF] to-[#305C87] cursor-pointer transition-colors duration-200 shadow-md">
                        Edit Details
                    </button>
                </div>

                {/* Profile Details Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div>
                        <label htmlFor="fullName" className="block text-gray-700 text-xl font-medium mb-2">
                            Full Name
                        </label>
                        <div id="fullName" className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800">
                            {user.name}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-xl font-medium mb-2">
                            Email
                        </label>
                        <div id="email" className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800">
                            {user.email}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block text-gray-700 text-xl font-medium mb-2">
                            Phone Number
                        </label>
                        <div id="phoneNumber" className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800">
                            {user.phone}
                        </div>
                    </div>
                </div>

                {/* Change Password Link */}
                <div>
                    <Link to='/dashboard/change_password' className="text-[#2563EB] text-xl  font-medium">
                        Change Password
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Settings
