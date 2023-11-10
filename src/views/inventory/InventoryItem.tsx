import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import EditIcon from "@/assets/edit-icon.svg";
import DeleteIcon from "@/assets/delete-icon.svg";
import ConfirmationModal from "@/components/ConfirmationModal";
import DialogModal from "@/components/DialogModal";

import handleRequestWithToast from "@/helpers/handleRequestWithToast";

type ItemProps = {
  id: number;
  name: string;
  stock: number;
  price: number;
  picture: string;
  onSelect: (id: number, isSelected: boolean) => void;
  isSelected: boolean;
};

const dataUrlToFile = async (
  dataUrl: string,
  fileName: string,
): Promise<File> => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], fileName, { type: "image/jpeg" });
};

const InventoryItem = ({
  id,
  name,
  stock,
  price,
  picture,
  onSelect,
  isSelected,
}: ItemProps) => {
  const [openEditProdModal, setOpenEditProdModal] = useState(false);
  const [openDeleteProdModal, setOpenDeleteProdModal] = useState(false);
  const [openChangePicModal, setOpenChangePicModal] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [product, setProduct] = useState({
    name: name || "",
    stock: stock !== undefined && stock !== null ? stock.toString() : "",
    price: price !== undefined && price !== null ? price.toString() : "",
  });

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(id, event.target.checked);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setEditedImage(e.target?.result as string);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleEditProduct = () => {
    handleRequestWithToast({
      method: "EDIT",
      productData: {
        id,
        name: product.name,
        stock: Number(product.stock),
        price: Number(product.price),
        picture,
      },
      messages: {
        loading: "Procesando...",
        success:
          "El producto se editó exitosamente. Refresque para ver los cambios.",
        error:
          "Hubo un error editando el producto. Por favor, intente más tarde.",
      },
      callback: () => setOpenEditProdModal(false),
    });
  };

  const handleDeleteProduct = () => {
    handleRequestWithToast({
      method: "DELETE",
      productData: {
        id,
        name: product.name,
        stock: Number(product.stock),
        price: Number(product.price),
        picture,
      },
      messages: {
        loading: "Procesando...",
        success:
          "El producto se eliminó exitosamente. Refresque para ver los cambios.",
        error:
          "Hubo un error eliminando el producto. Por favor, intente más tarde.",
      },
      callback: () => setOpenDeleteProdModal(false),
    });
  };

  const handleEditImg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editedImage) {
      alert("Por favor, cargue una imagen válida.");
      return;
    }
    const file = await dataUrlToFile(editedImage as string, "file.png");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/upload_img/${id}}`,
        {
          method: "PUT",
          body: file,
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_AUTHORIZATION_TOKEN_BEARER
            }`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

       // Por algún motivo falla la request...
      const data = await res.json();

      handleRequestWithToast({
        method: "EDIT",
        productData: {
          id,
          name: product.name,
          stock: Number(product.stock),
          price: Number(product.price),
          picture: data.picture_url,
        },
        messages: {
          loading: "Procesando...",
          success:
            "La imagen se editó exitosamente. Refresque para ver los cambios.",
          error:
            "Hubo un error editando la foto del producto. Por favor, intente más tarde.",
        },
        callback: () => setOpenChangePicModal(false),
      });
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  return (
    <div className="flex gap-3 rounded-sm bg-white p-3 shadow-custom min-[1130px]:min-h-[5.25rem]">
      <input
        name={`selectItem${id}`}
        type="checkbox"
        className="rounded-sm border-darkBlue-200 text-darkBlue-200 focus:ring-0"
        aria-label={`Select Item ${id}`}
        onChange={handleSelect}
        checked={isSelected}
      />
      <button
        className="relative h-[3.75rem] w-[3.75rem] text-darkBlue-200 focus:outline-darkBlue-100"
        onClick={() => setOpenChangePicModal(true)}
      >
        <img
          src={picture}
          alt="Product image"
          className="block h-full w-full"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 26 26"
          strokeWidth={1}
          stroke="currentColor"
          className="absolute bottom-0 right-0 h-5 w-5 rounded-sm bg-[#D7E5FF] p-px hover:bg-[#b0cbff]"
        >
          <g id="Group 37541">
            <path
              id="Vector 498"
              d="M3.62356 4.44828H5.87999C6.9787 4.44828 7.96426 3.75492 8.34458 2.72414C8.7249 1.69335 9.71046 1 10.8092 1H15.3648C16.4601 1 17.4362 1.69107 17.8 2.72414C18.1638 3.7572 19.1399 4.44828 20.2352 4.44828H22.3764C23.8254 4.44828 25 5.62289 25 7.07184V18.3764C25 19.8254 23.8254 21 22.3764 21H3.62356C2.17461 21 1 19.8254 1 18.3764V7.07184C1 5.62289 2.17461 4.44828 3.62356 4.44828Z"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              id="Ellipse 77"
              cx="13"
              cy="12"
              r="4.5"
              stroke="currentColor"
            />
          </g>
        </svg>
      </button>
      <div className="grid w-full grid-cols-2 gap-3 min-[1130px]:h-fit">
        <label
          htmlFor={`productTitle-${id}`}
          className="flex w-full flex-col max-[1130px]:col-span-full"
        >
          <span>Título</span>
          <input
            type="text"
            id={`productTitle-${id}`}
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Prueba"
            className="rounded-sm border-[#A1A3AF] text-sm/5 text-darkBlue-200 focus:border-darkBlue-200 focus:shadow-[0_0_4px_0_#6097FF]"
          />
        </label>
        <div className="flex gap-3 max-[350px]:flex-col">
          <label
            htmlFor={`productStock-${id}`}
            className="flex w-[5.6875rem] flex-col"
          >
            <span>Stock</span>
            <input
              type="number"
              id={`productStock-${id}`}
              value={product.stock}
              onChange={(e) =>
                setProduct({ ...product, stock: e.target.value })
              }
              placeholder="Prueba"
              className="rounded-sm border-[#A1A3AF] text-sm/5 text-darkBlue-200 focus:border-darkBlue-200 focus:shadow-[0_0_4px_0_#6097FF]"
            />
          </label>
          <label htmlFor={`productPrice-${id}`} className="flex flex-col">
            <span>Precio</span>
            <div className="relative flex flex-row">
              <input
                type="number"
                min="1"
                step="any"
                id={`productPrice-${id}`}
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
                placeholder="Prueba"
                className="peer w-28 rounded-sm border-[#A1A3AF] pl-10 text-sm/5 text-darkBlue-200 focus:border-darkBlue-200 focus:shadow-[0_0_4px_0_#6097FF]"
              />
              <div className="absolute top-0 m-auto h-[2.4rem] w-8 bg-[#A1A3AF] text-white peer-focus:bg-[#4871bf]">
                <span className="absolute left-[30%] top-[10%] text-2xl">
                  $
                </span>
              </div>
            </div>
          </label>
        </div>
      </div>
      <div className="ml-auto mr-0">
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button
            className="inline-flex w-full justify-center rounded-md focus:border-darkBlue-100 focus:outline-none focus:ring-0"
            aria-label="Context menu"
          >
            <svg
              viewBox="0 0 3 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              strokeWidth={0.1}
              stroke="currentColor"
              className="h-[1.6875rem] w-[1.6875rem] rounded-sm bg-[#d7e5ff] px-3 py-[0.3rem] text-[#6097FF] hover:bg-[#b0cbff] hover:text-darkBlue-200 focus:outline-darkBlue-100"
            >
              <g id="Group 38244">
                <circle
                  id="Ellipse 66"
                  cx="1.45455"
                  cy="1.45455"
                  r="1.45455"
                  fill="currentColor"
                />
                <circle
                  id="Ellipse 67"
                  cx="1.45455"
                  cy="7.99996"
                  r="1.45455"
                  fill="currentColor"
                />
                <circle
                  id="Ellipse 68"
                  cx="1.45455"
                  cy="14.5455"
                  r="1.45455"
                  fill="currentColor"
                />
              </g>
            </svg>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 top-2/3 z-10 mt-2 w-56 origin-top-right divide-y rounded-md bg-white shadow-custom focus:outline-none">
              <div className="flex flex-col gap-4 p-3">
                <Menu.Item
                  as="button"
                  onClick={() => setOpenEditProdModal(true)}
                  className="flex items-center"
                >
                  <img src={EditIcon} alt="Edit Icon" className="mr-4" />
                  Editar
                </Menu.Item>
                <Menu.Item
                  as="button"
                  onClick={() => setOpenDeleteProdModal(true)}
                  className="flex items-center"
                >
                  <img src={DeleteIcon} alt="Delete Icon" className="mr-3" />
                  Eliminar
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <ConfirmationModal
        isOpen={openEditProdModal}
        setIsOpen={setOpenEditProdModal}
        name="Editar producto"
        message="¿Estás seguro de editar el producto? Los cambios que realizaste serán guardados."
        confirmButtonText="Editar producto"
        handleConfirm={handleEditProduct}
      />

      <ConfirmationModal
        isOpen={openDeleteProdModal}
        setIsOpen={setOpenDeleteProdModal}
        name="Eliminar producto"
        message="¿Estás seguro de eliminar el producto? Esto no puede revertirse."
        confirmButtonText="Eliminar producto"
        handleConfirm={handleDeleteProduct}
      />
      <DialogModal
        isOpen={openChangePicModal}
        setIsOpen={setOpenChangePicModal}
        name="Foto de producto"
      >
        <form
          className="grid grid-cols-1 items-center justify-items-center gap-3 min-[1130px]:h-64 min-[1130px]:grid-cols-3"
          onSubmit={(e) => handleEditImg(e)}
        >
          <label
            htmlFor="editProductPicture"
            className="col-span-1 h-[12.625rem] w-[12.625rem] cursor-pointer bg-cover bg-center p-3 shadow-[1px_1px_9px_0_rgba(0,0,0,0.25)]"
            style={{
              backgroundImage: `url(${editedImage}), url(${picture})`,
            }}
          >
            <input
              type="file"
              accept="image/*"
              name="editProductPicture"
              id="editProductPicture"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
          <div className="col-span-2 flex w-full flex-col gap-3 px-3">
            <p className="text-sm/[1.37rem] font-light min-[1130px]:text-base">
              Al subir o cambiar esta imagen solo se modifica en el inventario
              de Ecomm-App.
              <span className="font-normal">
                {" "}
                No cambia ni reemplaza las imágenes en los canales de venta.
              </span>
            </p>

            <div className="flex w-full flex-col items-center gap-3">
              <button
                type="submit"
                className="h-10 rounded-[0.25rem] bg-[#6097ff] font-bold text-white min-[1130px]:w-full"
              >
                Cambiar foto
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // No está hecho el endpoint para solo borrar la imagen
                  setOpenChangePicModal(false);
                }}
                className="flex h-10 items-center justify-center rounded-[0.25rem] text-sm/[1.37rem] text-[#6097ff] min-[1130px]:w-full"
              >
                <img src={DeleteIcon} alt="Delete Icon" className="mr-3" />
                <span>Eliminar foto</span>
              </button>
            </div>
          </div>
        </form>
      </DialogModal>
    </div>
  );
};

export default InventoryItem;
