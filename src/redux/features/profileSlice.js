import { createSlice } from "@reduxjs/toolkit";

// Load accessToken from localStorage when Redux initializes
const storedAccessToken = localStorage.getItem("access_token");

const profileSlice = createSlice({
    name: "auth",
    initialState: {
        token: storedAccessToken || null  
    },
    reducers: {
        setUser: (state, action) => {
            console.log("Setting Token:", action?.payload?.access_token);
            state.token = action.payload.access_token;
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("access_token"); 
        }
    }
});

export const { logout, setUser } = profileSlice.actions;
export default profileSlice.reducer;