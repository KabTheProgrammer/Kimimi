export const BASE_URL =
  import.meta.env.MODE === "development"
    ? "/api"
    : "https://kimimi-final-backend.vercel.app/api";

export const USERS_URL = `${BASE_URL}/users`;
export const CATEGORY_URL = `${BASE_URL}/category`;
export const PRODUCT_URL = `${BASE_URL}/products`;
export const UPLOAD_URL = `${BASE_URL}/upload`;
export const ORDERS_URL = `${BASE_URL}/orders`;
