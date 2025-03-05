type Props = {
  name:string,
  url:string,
  icono:React.ReactNode;
} 

function ButtonSideBar({name,url,icono}:Props) { 




  return (
    <div className="flex items-center text-center p-4 text-white text-2xl gap-1.5 hover:bg-gray-700 rounded-xl cursor-pointer transition-colors duration-150">
        {icono}
        <a className="font-semibold text-white" href={url}>{name}</a> 
    </div>
  );
}

export default ButtonSideBar;
