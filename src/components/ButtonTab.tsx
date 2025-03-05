type buttonParams = {
  title: string;
  color: string;
  id: number;
  active: boolean;
  func: (id: number) => void;
  showText: (title:string) => void;
};

function ButtonTab({ title, color, id, func, active, showText}: buttonParams) {

  const handleClick = () => {
    func(id);
    showText(title);
  }

  return (
    <div
      onClick={() => handleClick()}
      key={id}
      className="p-2 w-full text-white rounded-lg text-center cursor-pointer transition-colors duration-200"
      style={{ backgroundColor: `${active ? color : "#1F2937"}` }}
    >
      {title} 
    </div>
  );    
}

export default ButtonTab;
