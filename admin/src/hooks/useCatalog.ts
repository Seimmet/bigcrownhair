import { useQuery } from "@tanstack/react-query";
import { catalogApi } from "@/lib/api";

export const useProducts = (params?: Record<string, unknown>) =>
  useQuery({
    queryKey: ["products", params],
    queryFn: async () => (await catalogApi.products(params)).data,
  });

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await catalogApi.categories()).data,
  });
