const Inventory = () => {
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
      <div className="flex items-center justify-between pb-5 pt-8">
        <label
          htmlFor="selectAllItems"
          className="flex items-center gap-1 text-sm/3 text-[#43475F]"
        >
          <input
            name="selectAllItems"
            type="checkbox"
            className="border-darkBlue-200 text-darkBlue-200 rounded-sm focus:ring-0"
          />
          <span>Seleccionar todos</span>
        </label>
        <button className="flex items-center rounded-sm bg-[#6097ff] px-2 py-2 text-white hover:bg-[#4871bf]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
            fill="none"
            strokeWidth={0.25}
            stroke="currentColor"
            className="h-5 w-8"
          >
            <circle cx="9" cy="9" r="8.57" stroke="white" stroke-width="0.86" />
            <path
              d="M9.125 4.77881V13.9712"
              stroke="white"
              stroke-width="0.86"
              stroke-linecap="round"
            />
            <path
              d="M13.7212 9.375L4.5288 9.375"
              stroke="white"
              stroke-width="0.86"
              stroke-linecap="round"
            />
          </svg>
          <span>Nuevo producto</span>
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default Inventory;
