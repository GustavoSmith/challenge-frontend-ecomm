import { NavBar, SideBar } from "@components/.";
import { Inventory } from "./views/inventory";

const App = () => {
  return (
    <div className="flex font-poppins max-[1129px]:flex-col">
      <SideBar />
      <div className="grow" id="page">
        <NavBar />
        <Inventory />
      </div>
    </div>
  );
};

export default App;
