import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("bigcrown_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("bigcrown_token");
    }
    return Promise.reject(error);
  },
);

export const authApi = {
  register: (data: unknown) => api.post("/auth/register", data),
  login: (data: unknown) => api.post("/auth/login", data),
  me: () => api.get("/auth/me"),
  logout: () => api.post("/auth/logout"),
};

export const catalogApi = {
  products: (params?: Record<string, unknown>) => api.get("/products", { params }),
  product: (slug: string) => api.get(`/products/${slug}`),
  categories: () => api.get("/categories"),
  createProduct: (data: unknown) => api.post("/products", data),
  updateProduct: (id: string, data: unknown) => api.patch(`/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
};

export const categoryApi = {
  list: () => api.get("/categories"),
  create: (data: unknown) => api.post("/categories", data),
  update: (id: string, data: unknown) => api.patch(`/categories/${id}`, data),
};

export const cartApi = {
  get: () => api.get("/cart"),
  add: (productId: string, quantity = 1) => api.post("/cart/items", { productId, quantity }),
  update: (productId: string, quantity: number) => api.patch(`/cart/items/${productId}`, { quantity }),
  remove: (productId: string) => api.delete(`/cart/items/${productId}`),
};

export const orderApi = {
  create: (data: unknown) => api.post("/orders", data),
  mine: () => api.get("/orders/mine"),
  adminAll: (params?: Record<string, unknown>) => api.get("/orders/admin/all", { params }),
  status: (id: string, data: unknown) => api.patch(`/orders/${id}/status`, data),
};

export const adminApi = {
  dashboard: () => api.get("/admin/dashboard"),
  staff: () => api.get("/admin/staff"),
  createStaff: (data: unknown) => api.post("/admin/staff", data),
  customers: (params?: Record<string, unknown>) => api.get("/customers", { params }),
};
