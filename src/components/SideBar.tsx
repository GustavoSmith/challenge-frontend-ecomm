import useWindowDimensions from "@/helpers/useWindowDimensions";
import EcommLogo from "@assets/ecomm-logo.svg";
import InventoryIcon from "@assets/inventory-icon.svg";
import MercadoLibreIcon from "@assets/mercadolibre-icon.svg";

import { useState, useEffect } from "react";

const SideBar = () => {
  const { width } = useWindowDimensions();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isMobile = width < 1130;
    setIsOpen((currentIsOpen) => {
      const page = document.getElementById("page");
      if (isMobile && currentIsOpen) {
        document.body.classList.add("overflow-hidden");
        page?.classList.add("blur-sm");
        return true;
      }
      document.body.classList.remove("overflow-hidden");
      page?.classList.remove("blur-sm");
      return !isMobile;
    });
  }, [width, isOpen]);

  return (
    <>
      <div className="flex w-full items-center justify-between bg-darkBlue-100 px-3 py-[1.11rem] min-[1130px]:hidden">
        <button
          onClick={() => setIsOpen((open) => !open)}
          className="text-white"
          aria-label="Open Menu"
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

        <img src={EcommLogo} alt="Ecomm Logo" className="mx-auto" />
      </div>
      {isOpen && (
        <aside className="flex h-screen w-52 flex-col gap-3 bg-darkBlue-100 px-2 py-2 text-white max-[1129px]:absolute max-[1129px]:top-12 max-[1129px]:z-20">
          <div>
            <img
              src={EcommLogo}
              alt="Ecomm Logo"
              className="min-[1130px]:ml-0 min-[1130px]:mr-auto min-[1130px]:pb-5"
            />
          </div>
          <div className="flex flex-col gap-2 bg-darkBlue-100">
            <a
              className="flex w-full items-center justify-between gap-3"
              href="/"
            >
              <div className="flex items-center gap-1">
                <img src={MercadoLibreIcon} alt="Mercado Libre Icon" />
                <span className="max-[1129px]:text-sm">Mercado Libre</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 7"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-auto mr-0 h-3 w-3"
              >
                <path
                  d="M5.29289 5.80797L1.70711 2.22218C1.07714 1.59222 1.52331 0.515076 2.41421 0.515076H9.58579C10.4767 0.515076 10.9229 1.59222 10.2929 2.22218L6.70711 5.80797C6.31658 6.19849 5.68342 6.19849 5.29289 5.80797Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a className="flex w-full items-center gap-1" href="/">
              <img src={InventoryIcon} alt="Inventario Icon" />
              <span>Inventario</span>
            </a>
          </div>
        </aside>
      )}
    </>
  );
};

export default SideBar;
