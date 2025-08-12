// import { FaUserTie } from "react-icons/fa"
// import { Link } from "react-router-dom"
// import { useGetProfileQuery } from "../../../redux/features/baseApi";
// import { useEffect } from "react";

// function Settings() {

//     const { data: profile, isLoading, error } = useGetProfileQuery();

//      useEffect(() => {
//     if (profile) {
//       console.log("Profile data:", profile);
//     }
//   }, [profile]);
   
// console.log(profile)


//     return (
//         <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
//             <div className="max-w-5xl mx-auto rounded-lg  shadow-md p-6">
//                 {/* Header Section */}
//                 <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
//                     <div className="flex items-center mb-4 gap-4 sm:mb-0">
//                         <div>

//                             {isLoading ? (
//                   <div className="w-8 h-8 rounded-full border border-gray-300 animate-pulse bg-gray-200"></div>
//                 ) : error ? (
//                   <FaUserTie className="w-12 h-12 border-2 border-gray-500 p-2 rounded-full text-gray-600" />
//                 ) : profile?.image ? (
//                   <img
//                     src={`http://10.10.13.73:7000${profile.image}`}
//                     alt={profile.name || "User"}
//                     className="w-12 h-12 roundedხ0 rounded-full border border-gray-300 object-cover"
//                     onError={(e) => {
//                       e.target.src = null; // Fallback if image fails
//                     }}
//                   />
//                 ) : (
//                   <FaUserTie className="w-12 h-12 border-2 border-gray-500 p-2 rounded-full text-gray-600" />
//                 )}

//                         </div>

//                         <div>
//                             <h1 className="text-2xl font-bold text-gray-800">Hello {profile?.name}!</h1>
//                             <p className="text-gray-600">{profile?.email}</p>
//                         </div>
//                     </div>
//                     <button className="px-6 py-2 rounded-full bg-[#1E90FF1A]0 text-white font-medium bg-gradient-to-b from-[#1E90FF] to-[#305C87] cursor-pointer transition-colors duration-200 shadow-md">
//                         Edit Details
//                     </button>
//                 </div>

//                 {/* Profile Details Section */}
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//                     <div>
//                         <label htmlFor="fullName" className="block text-gray-700 text-xl font-medium mb-2">
//                             Full Name
//                         </label>
//                         <div id="fullName" className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800">
//                             {profile?.name}
//                         </div>
//                     </div>
//                     <div>
//                         <label htmlFor="email" className="block text-gray-700 text-xl font-medium mb-2">
//                             Email
//                         </label>
//                         <div id="email" className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800">
//                             {profile?.email}
//                         </div>
//                     </div>
//                     <div>
//                         <label htmlFor="phoneNumber" className="block text-gray-700 text-xl font-medium mb-2">
//                             Phone Number
//                         </label>
//                         <div id="phoneNumber" className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800">
//                             {profile.phone}
//                         </div>
//                     </div>
//                 </div>

//                 {/* Change Password Link */}
//                 <div>
//                     <Link to='/dashboard/change_password' className="text-[#2563EB] text-xl  font-medium">
//                         Change Password
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Settings



import { FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetProfileQuery, useProfileUpdateMutation } from "../../../redux/features/baseApi";
import { useEffect, useState } from "react";

function Settings() {
  const { data: profile, isLoading, error } = useGetProfileQuery();
  const [isEditing, setIsEditing] = useState(false);
  const [profileUpdate, { isLoading: isUpdating, isError }] = useProfileUpdateMutation();

  useEffect(() => {
    if (profile) {
      console.log("Profile data:", profile);
    }
  }, [profile]);

  console.log(profile);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Ensure all required fields are present
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const image = formData.get("image");

    if (!name || !email || !phone || !image) {
    //   alert("Please fill in all fields, including the image.");
      return;
    }

    try {
      await profileUpdate(formData).unwrap();
      alert("Profile updated successfully!");
      setIsEditing(false); // Toggle back to view mode after successful update
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto rounded-lg shadow-md p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="flex items-center mb-4 gap-4 sm:mb-0">
            <div>
              {isLoading ? (
                <div className="w-8 h-8 rounded-full border border-gray-300 animate-pulse bg-gray-200"></div>
              ) : error ? (
                <FaUserTie className="w-12 h-12 border-2 border-gray-500 p-2 rounded-full text-gray-600" />
              ) : profile?.image ? (
                <img
                  src={`http://10.10.13.73:7000${profile.image}`}
                  alt={profile.name || "User"}
                  className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                  onError={(e) => {
                    e.target.src = null; // Fallback if image fails
                  }}
                />
              ) : (
                <FaUserTie className="w-12 h-12 border-2 border-gray-500 p-2 rounded-full text-gray-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Hello {profile?.name}!</h1>
              <p className="text-gray-600">{profile?.email}</p>
            </div>
          </div>
          <button
            onClick={handleEditToggle}
            className="px-6 py-2 rounded-full bg-[#1E90FF1A] text-white font-medium bg-gradient-to-b from-[#1E90FF] to-[#305C87] cursor-pointer transition-colors duration-200 shadow-md"
          >
            {isEditing ? "Update Profile" : "Edit Details"}
          </button>
        </div>

        {/* Profile Details Section */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 text-xl font-medium mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                id="fullName"
                name="name"
                defaultValue={profile?.name || ""}
                className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800"
                required
              />
            ) : (
              <div id="fullName" className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800">
                {profile?.name}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-xl font-medium mb-2">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={profile?.email || ""}
                className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800"
                required
              />
            ) : (
              <div id="email" className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800">
                {profile?.email}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-gray-700 text-xl font-medium mb-2">
              Phone Number
            </label>
            {isEditing ? (
              <input
                type="text"
                id="phoneNumber"
                name="phone"
                defaultValue={profile?.phone || ""}
                className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800"
                required
              />
            ) : (
              <div id="phoneNumber" className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800">
                {profile?.phone}
              </div>
            )}
          </div>
          {isEditing && (
            <div>
              <label htmlFor="image" className="block text-gray-700 text-xl font-medium mb-2">
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800"
                required
              />
            </div>
          )}
          {isEditing && (
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2 rounded-full bg-[#1E90FF1A] text-white font-medium bg-gradient-to-b from-[#1E90FF] to-[#305C87] cursor-pointer transition-colors duration-200 shadow-md"
            >
              {isUpdating ? "Updating..." : "Save Changes"}
            </button>
          )}
          {isError && <p className="text-red-500">Failed to update profile. Please try again.</p>}
        </form>

        {/* Change Password Link */}
        <div>
          <Link to="/dashboard/change_password" className="text-[#2563EB] text-xl font-medium">
            Change Password
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Settings;


