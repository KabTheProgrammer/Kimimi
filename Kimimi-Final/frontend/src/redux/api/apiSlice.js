import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../constants";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token; // ✅ get token from Redux

    if (token) {
      headers.set("Authorization", `Bearer ${token}`); // ✅ attach token to every request
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});




// const baseQuery = fetchBaseQuery({
//   baseUrl: "https://kimimi-final-backend.vercel.app",
//   credentials: "include",
//   prepareHeaders: (Headers, {getState}) => {
//     const token = getState().auth.token
//     if (token) {
//       Headers.set("authorization", `Bearer {token}`)
//     }
//     return Headers
//   }
// })
