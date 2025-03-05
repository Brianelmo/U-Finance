import ButtonTab from "./ButtonTab";
import { useState } from "react";
import ExpensesCards from "./ExpensesCards";
import SavingCard from "./SavingCard";

function TabsList() {
  const [activeButton, setActiveButton] = useState<number | null>(null);
  const [title, setTitle] = useState('Expenses'); 

  const selectTitle = (text:string) => {
    setTitle(text);
  }


  return (
    <div className="w-full flex flex-col gap-4 p-2  rounded-lg">
      <div className="w-full bg-[#1F2937] rounded-lg p-2">
        <ul className="w-full flex justify-between gap-2">
          <ButtonTab
            title="Expenses"
            color="#F44336"
            id={1}
            active={activeButton === 1}
            showText={() => selectTitle('Expenses')}
            func={() => setActiveButton(1)}
          />
          <ButtonTab
            title="Income"
            color="#4CAF50"
            id={2}
            active={activeButton === 2}
            showText={() => selectTitle('Income')}
            func={ () =>setActiveButton(2)}
          />
          <ButtonTab
            title="Savings"
            color="#2196F3"
            id={3}
            active={activeButton === 3}
            showText={() => selectTitle('Savings')}
            func={() => setActiveButton(3)}
          />
        </ul>
      </div>
      <section className="">
        {title === 'Savings' && (
         <SavingCard/>
        )}
        {title !== 'Savings' && (
          <ExpensesCards title={title}/>
        )}
      </section>
    </div>
  );
}

export default TabsList;
