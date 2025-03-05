
interface Props {
  title: string;
  icon: string;
  number: number;
  color: string;
};

function CardDashboard({ title, icon, number, color }: Props) {
  return (
    <div className={`bg-[#1F2937] w-full p-6 rounded-xl flex flex-col gap-4 border-l-4`} style={{borderColor:`${color}`}}>
      <div className="flex items-center justify-between">
        <h3 className="text-white text-2xl">{title}</h3>
        <box-icon name={`${icon}`} color={`${color}`} size='35px'></box-icon>
      </div>
      <span className={`text-2xl font-bold`} style={{color: `${color}`}}>${number}</span>
    </div>
  );
}

export default CardDashboard;
