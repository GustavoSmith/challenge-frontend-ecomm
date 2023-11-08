import EcommLogo from "@assets/ecomm-logo.svg";
import InventoryIcon from "@assets/inventory-icon.svg";
import MercadoLibreIcon from "@assets/mercadolibre-icon.svg";

import { useState } from "react";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-darkBlue flex flex-col py-[1.11rem] text-white max-[1130px]:px-3 min-[1130px]:fixed min-[1130px]:h-full min-[1130px]:w-48 min-[1130px]:pl-2 min-[1130px]:pt-2">
      <div className="flex w-full items-center justify-between">
        <button
          onClick={() => setIsOpen((open) => !open)}
          className="min-[1130px]:hidden"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-7 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-7 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>

        <img
          src={EcommLogo}
          alt="Ecomm Logo"
          className="mx-auto sm:ml-[4.5rem] min-[1130px]:ml-0 min-[1130px]:mr-auto"
        />
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2 px-4 py-4">
          <a className="flex w-full items-center" href="/">
            <img src={MercadoLibreIcon} alt="Inventario" />
            <span>Mercado Libre</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 12 7"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-auto mr-0 h-4 w-4"
            >
              <path
                d="M5.29289 5.80797L1.70711 2.22218C1.07714 1.59222 1.52331 0.515076 2.41421 0.515076H9.58579C10.4767 0.515076 10.9229 1.59222 10.2929 2.22218L6.70711 5.80797C6.31658 6.19849 5.68342 6.19849 5.29289 5.80797Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a className="flex w-full items-center" href="/">
            <img src={InventoryIcon} alt="Inventario" />
            <span>Inventario</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default SideBar;
