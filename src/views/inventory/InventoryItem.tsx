type ItemProps = {
  id: number;
  title: string;
  stock: number;
  price: number;
  picture: string;
  onSelect: (id: number, isSelected: boolean) => void;
  isSelected: boolean;
};

const InventoryItem = ({
  id,
  title,
  stock,
  price,
  picture,
  onSelect,
  isSelected,
}: ItemProps) => {
  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelect(id, event.target.checked);
  };
  return (
    <div className="shadow-custom flex gap-3 rounded-sm bg-white p-3 min-[1130px]:min-h-[5.25rem]">
      <input
        name={`selectItem${id}`}
        type="checkbox"
        className="rounded-sm border-darkBlue-200 text-darkBlue-200 focus:ring-0"
        aria-label={`Select Item ${id}`}
        onChange={handleSelect}
        checked={isSelected}
      />
      <button className="relative h-[3.75rem] w-[3.75rem] text-darkBlue-200">
        <img
          src={picture}
          alt="Headphone image"
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
            defaultValue={title}
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
              defaultValue={stock}
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
                defaultValue={price}
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
        <svg
          viewBox="0 0 3 16"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          strokeWidth={0.1}
          stroke="currentColor"
          className="h-[1.6875rem] w-[1.6875rem] rounded-sm bg-[#d7e5ff] px-3 py-[0.3rem] text-[#6097FF] hover:bg-[#b0cbff] hover:text-darkBlue-200"
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
      </div>
    </div>
  );
};

export default InventoryItem;
