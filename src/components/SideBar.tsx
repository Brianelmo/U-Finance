import ButtonSideBar from "./ButtonSideBar";
import { useContext } from "react";
import { userContext } from "../Context/UserContext";
import { IconUser } from '@tabler/icons-react';
import { IconHome } from "@tabler/icons-react";
import { IconChartPie } from "@tabler/icons-react";

function SideBar() {
  const context = useContext(userContext);
  const user = context?.user;

  return (
    <div className="max-w-[450px] p-4 flex flex-col gap-10 border-2 shadow-2xl h-screen bg-[#1F2937] justify-between">
      <div className="flex flex-col gap-10">
        <h2 className="text-4xl font-bold text-white">U-Finances</h2>
        <div className="flex flex-col justify-center">
          <ButtonSideBar name="Dashboard" url="/" icono={<IconHome stroke={1} size={30}/>} />
          <ButtonSideBar name="Reports"  url="/" icono={<IconChartPie stroke={1} size={30}/>} />
        </div>
      </div>
      {user ? (
        <div className="flex flex-row-reverse items-center gap-2 justify-center">
          <p className="text-white text-xl font-bold">{user.nombre}</p>
          <IconUser stroke={1} color="white" size={30}/>
        </div> 
      ) : (
        <div className="bg-white w-fit p-2 rounded-full flex items-center justify-center">
          <IconUser stroke={1} color="black" size={30}/>
        </div>
      )}
    </div>
  );
}

export default SideBar;
