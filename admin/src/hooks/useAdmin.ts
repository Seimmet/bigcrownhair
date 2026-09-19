import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminApi, authApi, catalogApi, categoryApi, orderApi } from "@/lib/api";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => (await authApi.me()).data.user,
    retry: false,
  });
}

export function useAdminDashboard() {
  return useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: async () => (await adminApi.dashboard()).data,
  });
}

export function useAdminStaff() {
  return useQuery({
    queryKey: ["admin", "staff"],
    queryFn: async () => (await adminApi.staff()).data,
  });
}

export function useCustomers(search = "") {
  return useQuery({
    queryKey: ["admin", "customers", search],
    queryFn: async () => (await adminApi.customers(search ? { q: search } : undefined)).data,
  });
}

export function useAdminProducts() {
  return useQuery({
    queryKey: ["admin", "products"],
    queryFn: async () => (await catalogApi.products({ limit: 100 })).data,
  });
}

export function useAdminCategories() {
  return useQuery({
    queryKey: ["admin", "categories"],
    queryFn: async () => (await catalogApi.categories()).data,
  });
}

export function useAdminOrders(status = "") {
  return useQuery({
    queryKey: ["admin", "orders", status],
    queryFn: async () => (await orderApi.adminAll(status ? { status } : undefined)).data,
  });
}

export function useCreateStaff() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => (await adminApi.createStaff(data)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "staff"] }),
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => (await catalogApi.createProduct(data)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    },
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) =>
      (await catalogApi.updateProduct(id, data)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => (await catalogApi.deleteProduct(id)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
      qc.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    },
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => (await categoryApi.create(data)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "categories"] });
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) =>
      (await categoryApi.update(id, data)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "categories"] });
      qc.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: unknown }) =>
      (await orderApi.status(id, data)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "orders"] });
      qc.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    },
  });
}
