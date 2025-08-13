


// import { FaUserTie } from "react-icons/fa";
// import { Link } from "react-router-dom";
// // import { useGetProfileQuery, useProfileUpdateMutation } from "../../../redux/features/baseApi";
// import { useEffect, useState } from "react";
// import { useGetProfileQuery, useProfileUpdateMutation } from "../../../redux/features/apiSlice";
// import { toast, Toaster } from "sonner";

// function Settings() {
//   const { data: profile, isLoading, error } = useGetProfileQuery();
//   const [isEditing, setIsEditing] = useState(false);
//   const [profileUpdate, { isLoading: isUpdating }] = useProfileUpdateMutation();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     image: null,
//   });



//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

// useEffect(() => {
//   if (profile && !isLoading) {
//     const newFormData = {
//       name: profile.name || "",
//       email: profile.email || "",
//       phone: profile.phone || "",
//       image: profile.image ? `http://10.10.13.73:7000${profile.image}` : null,
//     };
//     setFormData(newFormData);
//   }
// }, [profile, isLoading]);





// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const formDataToSend = new FormData(e.target);

 

//   try {
//     await profileUpdate(formDataToSend).unwrap();
//     toast.success("Profile updated successfully!");
//     setIsEditing(false);
//   } catch (error) {
//     console.error("Failed to update profile:", error);
//     toast.error("Failed to update profile. Please try again.");
//   }
// };

//   return (
//     <div className="min-h-screen p-4 sm:p-6 lg:p-8">
//       <div className="max-w-5xl mx-auto rounded-lg shadow-md p-6">
//         {/* Header Section */}
//         <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
//           <div className="flex items-center mb-4 gap-4 sm:mb-0">
//             <div>
//               {isLoading ? (
//                 <div className="w-8 h-8 rounded-full border border-gray-300 animate-pulse bg-gray-200"></div>
//               ) : error ? (
//                 <FaUserTie className="w-12 h-12 border-2 border-gray-500 p-2 rounded-full text-gray-600" />
//               ) : profile?.image ? (
//                 <img
//                   src={`http://10.10.13.73:7000${profile.image}`}
//                   alt={profile.name || "User"}
//                   className="w-12 h-12 rounded-full border border-gray-300 object-cover"
//                   onError={(e) => {
//                     e.target.src = null; // Fallback if image fails
//                   }}
//                 />
//               ) : (
//                 <FaUserTie className="w-12 h-12 border-2 border-gray-500 p-2 rounded-full text-gray-600" />
//               )}
//             </div>
           
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">Hello {profile?.name}!</h1>
//               <p className="text-gray-600">{profile?.email}</p>
//             </div>
//           </div>
//           <button
//             onClick={handleEditToggle}
//             type='submit'
//             className="px-6 py-2 rounded-full bg-[#1E90FF1A] text-white font-medium bg-gradient-to-b from-[#1E90FF] to-[#305C87] cursor-pointer transition-colors duration-200 shadow-md"
//           >
//             {isEditing ? "Update Profile" : "Edit Details"}
//           </button>
//         </div>

//         {/* Profile Details Section */}
//         <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
//           <div>
//             <label htmlFor="fullName" className="block text-gray-700 text-xl font-medium mb-2">
//               Full Name
//             </label>
//             {isEditing ? (
//               <input
//                 type="text"
//                 id="fullName"
//                 name="name"
//                 defaultValue={profile?.name || ""}
//                 className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800"
//                 required
//               />
//             ) : (
//               <div id="fullName" className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800">
//                 {profile?.name}
//               </div>
//             )}
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-gray-700 text-xl font-medium mb-2">
//               Email
//             </label>
//             {isEditing ? (
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 disabled
//                 defaultValue={profile?.email || ""}
//                 className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800"
//                 required
//               />
//             ) : (
//               <div id="email" className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800">
//                 {profile?.email}
//               </div>
//             )}
//           </div>
//           <div>
//             <label htmlFor="phoneNumber" className="block text-gray-700 text-xl font-medium mb-2">
//               Phone Number
//             </label>
//             {isEditing ? (
//               <input
//                 type="text"
//                 id="phoneNumber"
//                 name="phone"
//                 defaultValue={profile?.phone || ""}
//                 className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800"
//                 required
//               />
//             ) : (
//               <div id="phoneNumber" className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800">
//                 {profile?.phone}
//               </div>
//             )}
//           </div>
//           {isEditing && (
//             <div>
//               <label htmlFor="image" className="block text-gray-700 text-xl font-medium mb-2">
//                 Profile Image
//               </label>
//               <input
//                 type="file"
//                 id="image"
//                 name="image"
//                 className="w-full px-3 py-2 bg-[#1E90FF1A] rounded-md text-gray-800"
//                 required
//               />
//             </div>
//           )}
//           {isEditing && (
//             <button
//               type="submit"
//               disabled={isUpdating}
//               className="px-6 py-2 rounded-full bg-[#1E90FF1A] text-white font-medium bg-gradient-to-b from-[#1E90FF] to-[#305C87] cursor-pointer transition-colors duration-200 shadow-md"
//             >
//               {isUpdating ? "Updating..." : "Save Changes"}
//             </button>
//           )}
          
//         </form>

//         {/* Change Password Link */}
//         <div>
//           <Link to="/dashboard/change_password" className="text-[#2563EB] text-xl font-medium">
//             Change Password
//           </Link>
//         </div>
//       </div>
//       <Toaster position="top-right"/>
//     </div>
//   );
// }

// export default Settings;


import { FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useGetProfileQuery, useProfileUpdateMutation } from "../../../redux/features/apiSlice";
import { toast, Toaster } from "sonner";

function Settings() {
  const { data: profile, isLoading, error } = useGetProfileQuery();
  const [isEditing, setIsEditing] = useState(false);
  const [profileUpdate, { isLoading: isUpdating }] = useProfileUpdateMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (profile && !isLoading) {
      const newFormData = {
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        image: null,
      };
      setFormData(newFormData);
      setImagePreview(profile.image ? `http://10.10.13.73:7000${profile.image}` : null);
    }
  }, [profile, isLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle edit mode
    if (isEditing) {
      // Reset form data to original profile data when canceling edit
      setFormData({
        name: profile?.name || "",
        email: profile?.email || "",
        phone: profile?.phone || "",
        image: null,
      });
      setImagePreview(profile?.image ? `http://10.10.13.73:7000${profile.image}` : null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await profileUpdate(formDataToSend).unwrap();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      if (imagePreview && formData.image) {
        URL.revokeObjectURL(imagePreview);
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
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
              ) : (
                <img
                  src={imagePreview || (profile?.image ? `http://10.10.13.73:7000${profile.image}` : null)}
                  alt={profile?.name || "User"}
                  className={`w-12 h-12 rounded-full border border-gray-300 object-cover ${isEditing ? "cursor-pointer" : ""}`}
                  onClick={handleImageClick}
                  onError={(e) => {
                    e.target.src = null;
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
              )}
              {!imagePreview && !profile?.image && !isLoading && !error && (
                <FaUserTie className="w-12 h-12 border-2 border-gray-500 p-2 rounded-full text-gray-600" />
              )}
              <input
                type="file"
                id="image"
                name="image"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Hello {profile?.name}!</h1>
              <p className="text-gray-600">{profile?.email}</p>
            </div>
          </div>
          <button
            onClick={handleEditToggle}
            type="button"
            disabled={isUpdating}
            className="px-6 py-2 rounded-full bg-[#1E90FF1A] text-white font-medium bg-gradient-to-b from-[#1E90FF] to-[#305C87] cursor-pointer transition-colors duration-200 shadow-md"
          >
            {isEditing ? "Cancel" : "Edit Details"}
          </button>
        </div>

        {/* Profile Details Section */}
        <form id="profileForm" onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 text-xl font-medium mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                id="fullName"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
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
                value={formData.email}
                onChange={handleInputChange}
                disabled
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
                value={formData.phone}
                onChange={handleInputChange}
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
            <button
              type="submit"
              disabled={isUpdating}
              className="px-6 py-2 rounded-full bg-[#1E90FF1A] text-white font-medium bg-gradient-to-b from-[#1E90FF] to-[#305C87] cursor-pointer transition-colors duration-200 shadow-md"
            >
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>
          )}
        </form>

        {/* Change Password Link */}
        <div>
          <Link to="/dashboard/change_password" className="text-[#2563EB] text-xl font-medium">
            Change Password
          </Link>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default Settings;
