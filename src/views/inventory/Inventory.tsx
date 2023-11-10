import { useEffect, useState } from "react";
import { InventoryItem } from ".";
import DialogModal from "@/components/DialogModal";
import { Toaster } from "react-hot-toast";
import { NewProductProps, ProductProps } from "./types";
import { handleRequestWithToast } from "@/hooks/handleRequestWithToast";

const Inventory = () => {
  const [data, setData] = useState<ProductProps[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [openNewProdModal, setOpenNewProdModal] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleNewProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedImage) {
      alert("Por favor, seleccione una imagen para el nuevo producto.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const {
      /* newProductPicture: picture, */
      newProductName: name,
      newProductPrice: price,
      description = "",
      newProductStock: stock,
    } = Object.fromEntries(formData);

    const parsedItemData: NewProductProps = {
      // Picture hardcodeada; no coincide la documentación con el diseño
      picture:
        "https://fastly.picsum.photos/id/1041/360/240.jpg?hmac=k0GSg3qY8v7Z8L0r_YrJ6f2zLbOUIvu641N-Ep2AQjc",
      name: name as string,
      description: description as string,
      stock: Number(stock),
      price: Number(price),
    };

    handleRequestWithToast({
      method: "CREATE",
      productData: parsedItemData,
      messages: {
        loading: "Procesando...",
        success:
          "El producto se creó exitosamente. Refresque para ver los cambios.",
        error:
          "Hubo un error creando el producto. Por favor, intente más tarde.",
      },
      callback: () => setOpenNewProdModal(false),
    });
  };

  const handleSelectItem = (id: number, isSelected: boolean) => {
    setSelectedItems((prevSelectedItems) => {
      if (isSelected) {
        return [...prevSelectedItems, id];
      } else {
        return prevSelectedItems.filter((itemId) => itemId !== id);
      }
    });
  };

  const allItemsSelected = selectedItems.length === data.length;

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItems(data.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

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
        console.error(error);
        return [];
      });
  }, []);

  return (
    <div className="h-[calc(100vh-3.75rem)] bg-[#ececec] py-3 pl-3 pr-[18px]">
      <div className="flex flex-col gap-3">
        <h1 className="text-[1.375rem] font-bold text-darkBlue-200">
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
            className="rounded-sm border-darkBlue-200 text-darkBlue-200 focus:ring-0"
            onChange={handleSelectAll}
            checked={allItemsSelected}
          />
          {selectedItems.length > 0 ? (
            <span>{selectedItems.length} productos seleccionados </span>
          ) : (
            <span>Seleccionar todos</span>
          )}
        </label>
        <button
          onClick={() => setOpenNewProdModal(true)}
          className="ml-auto mr-0 flex w-fit items-center rounded-sm bg-[#6097ff] px-2 py-2 text-white hover:bg-[#4871bf] "
        >
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
        <DialogModal
          isOpen={openNewProdModal}
          setIsOpen={setOpenNewProdModal}
          name="Nuevo producto"
        >
          <>
            <p className="text-sm">
              Creá tu producto y vinculalo con las publicaciones
              correspondientes.
            </p>
            <form
              id="createNewProduct"
              className="shadow-custom grid w-full grid-cols-3 items-start gap-3 rounded-sm bg-white p-3 sm:grid-cols-6 sm:grid-rows-2"
              onSubmit={(e) => handleNewProduct(e)}
            >
              <label
                htmlFor="newProductPicture"
                className={`col-span-2 col-start-1 row-span-2 row-start-1 h-20 w-20 bg-cover bg-center`}
                style={{
                  backgroundImage: `url(${selectedImage}), url('/src/assets/picture-placeholder.png')`,
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  name="newProductPicture"
                  id="newProductPicture"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <label
                htmlFor="newProductName"
                className="col-span-4 col-start-2 row-start-1 flex flex-col"
              >
                <span className="text-xs/4">Titulo</span>
                <input
                  type="text"
                  name="newProductName"
                  id="newProductName"
                  required
                  className="w-full rounded-sm border-[#A1A3AF] text-sm/5 text-darkBlue-200 focus:border-darkBlue-200 focus:shadow-[0_0_4px_0_#6097FF]"
                />
              </label>
              <div className="col-start-2 row-start-2 flex gap-3">
                <label
                  htmlFor="newProductPrice"
                  className="col-span-2 flex flex-col"
                >
                  <span className="text-xs/4">Precio</span>
                  <div className="relative flex flex-row">
                    <input
                      type="number"
                      min="1"
                      step="any"
                      name="newProductPrice"
                      id="newProductPrice"
                      required
                      className="peer w-[7rem] rounded-sm border-[#A1A3AF] pl-10 text-sm/5 text-darkBlue-200 focus:border-darkBlue-200 focus:shadow-[0_0_4px_0_#6097FF] max-[425px]:max-w-[5rem]"
                    />
                    <div className="absolute top-0 m-auto h-[2.4rem] w-8 bg-[#A1A3AF] text-white peer-focus:bg-[#4871bf]">
                      <span className="absolute left-[30%] top-[10%] text-2xl">
                        $
                      </span>
                    </div>
                  </div>
                </label>
                <label
                  htmlFor="newProductStock"
                  className="col-span-2 flex flex-col"
                >
                  <span className="text-xs/4">Stock</span>
                  <input
                    type="text"
                    name="newProductStock"
                    id="newProductStock"
                    required
                    className="w-[7rem] rounded-sm border-[#A1A3AF] text-sm/5 text-darkBlue-200 focus:border-darkBlue-200 focus:shadow-[0_0_4px_0_#6097FF] max-[425px]:max-w-[5rem]"
                  />
                </label>
              </div>
            </form>
            <div className="flex gap-3 max-[1129px]:flex-col min-[1130px]:ml-auto min-[1130px]:flex-row-reverse">
              <button
                type="submit"
                form="createNewProduct"
                className="h-10 rounded-[0.25rem] bg-[#6097ff] font-bold text-white min-[1130px]:w-[12.625rem]
              "
              >
                Crear producto
              </button>
              <button
                onClick={() => setOpenNewProdModal(false)}
                className="h-10 rounded-[0.25rem] border border-[#6097ff] font-bold text-[#6097ff] min-[1130px]:w-[12.625rem]"
              >
                Cancelar
              </button>
            </div>
          </>
        </DialogModal>
      </div>

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
        <div className="grid h-[60%] grid-cols-1 gap-3 overflow-scroll md:max-[1130px]:grid-cols-2 min-[1130px]:h-[75%]">
          {data.map((item) => (
            <InventoryItem
              key={item.id}
              id={item.id}
              name={item.name}
              stock={item.stock}
              price={item.price}
              picture={item.picture}
              onSelect={handleSelectItem}
              isSelected={selectedItems.includes(item.id)}
            />
          ))}
        </div>
      )}

      {/* <DialogModal
        isOpen={openChangeImgModal}
        setIsOpen={setOpenChangeImgModal}
        name="Foto de producto"
      /> */}
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 5000,
          loading: {
            style: {
              background: "#909399",
              color: "white",
            },
          },
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              background: "red",
              color: "white",
            },
          },
        }}
      />
    </div>
  );
};

export default Inventory;
