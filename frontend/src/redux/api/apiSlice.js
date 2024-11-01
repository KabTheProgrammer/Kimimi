import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";
import { logout } from "../features/auth/authSlice"; // Import logout if needed

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.userInfo?.token || localStorage.getItem("userToken"); // Fetch the token from Redux state or localStorage
        if (token) {
            headers.set("Authorization", `Bearer ${token}`); // Set the authorization header
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Product", "Order", "User", "Category"],
    endpoints: () => ({}),
});
