import { useEffect, useState } from "react";
import { InventoryItem } from ".";

type InventoryItem = {
  picture: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  id: number;
};

const Inventory = () => {
  const [data, setData] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetch("https://admin.ecomm-app.com/api/challenge-items", {
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_AUTHORIZATION_TOKEN_BEARER
        }`,
      },
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error);
        return [];
      });
  }, []);

  console.log({ data });

  return (
    <div className="h-[calc(100vh-3.75rem)] bg-[#ececec] py-3 pl-3 pr-[18px]">
      <div className="flex flex-col gap-3">
        <h1 className="text-darkBlue-200 text-[1.375rem] font-bold">
          Inventario
        </h1>
        <p className="text-sm text-[#43475F]">
          Aquí podrás crear, editar y vincular los productos de tu inventario a
          las publicaciones de tus canales de venta.
        </p>
      </div>
      <div className="flex w-full justify-between gap-3 pb-5 pt-8 max-[1130px]:flex-col-reverse min-[1130px]:items-center">
        <label
          htmlFor="selectAllItems"
          className="flex items-center gap-1 text-sm/3 text-[#43475F]"
        >
          <input
            id="selectAllItems"
            type="checkbox"
            className="border-darkBlue-200 text-darkBlue-200 rounded-sm focus:ring-0"
          />
          <span>Seleccionar todos</span>
        </label>
        <button className="ml-auto mr-0 flex w-fit items-center rounded-sm bg-[#6097ff] px-2 py-2 text-white hover:bg-[#4871bf] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="none"
            strokeWidth={0.25}
            stroke="currentColor"
            className="h-5 w-8"
          >
            <circle cx="9" cy="9" r="8.57" stroke="white" strokeWidth="0.86" />
            <path
              d="M9.125 4.77881V13.9712"
              stroke="white"
              strokeWidth="0.86"
              strokeLinecap="round"
            />
            <path
              d="M13.7212 9.375L4.5288 9.375"
              stroke="white"
              strokeWidth="0.86"
              strokeLinecap="round"
            />
          </svg>
          <span>Nuevo producto</span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {data.length === 0 ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="m-auto h-12 w-12 animate-spin fill-blue-600 text-gray-200"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          data.map((item) => (
            <InventoryItem
              key={item.id}
              title={item.name}
              stock={item.stock}
              price={item.price}
              picture={item.picture}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Inventory;
