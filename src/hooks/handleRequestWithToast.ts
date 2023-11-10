import {
  ProductProps,
  NewProductProps,
  EditProductProps,
} from "@/views/inventory/types";
import { toast } from "react-hot-toast";

type ProductData = ProductProps | NewProductProps | EditProductProps;

type RequestProps = {
  method: "CREATE" | "EDIT" | "DELETE";
  productData: ProductData;
  messages: {
    loading: string;
    success: string;
    error: string;
  };
  callback: () => void;
};

const methods = {
  CREATE: "POST",
  EDIT: "PUT",
  DELETE: "DELETE",
};

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_AUTHORIZATION_TOKEN_BEARER}`,
  "Content-Type": "application/json",
};

export const handleRequestWithToast = ({
  method,
  productData,
  messages,
  callback,
}: RequestProps) => {
  const url = `${import.meta.env.VITE_API_URL}${
    !("id" in productData) ? "" : `/${productData.id}`
  }`;

  console.log({ productData });

  const promise = async (productData: ProductData) => {
    try {
      const res = await fetch(url, {
        method: methods[method],
        body: JSON.stringify(productData),
        headers,
      });

      if (!res.ok) {
        throw new Error(`Error al realizar la operación ${method}`);
      }

      return res.ok;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  toast
    .promise(promise(productData), {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    })
    .finally(callback);
};
