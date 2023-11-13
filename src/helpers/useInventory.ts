import { create } from "zustand";
import { ProductProps } from "@/views/inventory/types";

type ProductState = {
  products: ProductProps[];
  setProducts: (products: ProductProps[]) => void;
  getProducts: () => Promise<void>;
};

export const useProductsStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products: ProductProps[]) => set(() => ({ products })),
  getProducts: async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}`, {
        headers: {
          Authorization: `Bearer ${
            import.meta.env.VITE_AUTHORIZATION_TOKEN_BEARER
          }`,
        },
      });

      const data = await res.json();
      set({ products: data });
    } catch (error) {
      console.log(error);
    }
  },
}));
