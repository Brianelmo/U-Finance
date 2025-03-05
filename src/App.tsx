import CardDashboard from "./components/CardDashboard";
import SavingProgress from "./components/SavingProgress";
import SideBar from "./components/SideBar";
import TabsList from "./components/TabsList";
import RegisterModule from "./components/RegisterModule";
import { useState } from "react";

function App() {
  const [showModule, setShowModule] = useState(false);

  return (
    <div className="bg-[#111827] flex h-screen">
      <SideBar />
      <section className="flex-1 flex overflow-auto flex-col gap-10 px-20">
        <nav className="flex justify-between items-center mt-10">
          <h2 className="text-3xl text-white font-bold">Dashboard</h2>
          <button
            onClick={() => {
              setShowModule(true);
            }}
            className="text-xl bg-[#1F2937] py-2 px-4 font-bold rounded-lg text-center text-white cursor-pointer hover:bg-gray-700 transition-colors"
          >
            Register
          </button>
        </nav>
        {showModule && <RegisterModule func={() => {setShowModule(false)}} />}
        <div className="flex gap-10 justify-center items-center">
          <CardDashboard
            color="#05DD71"
            title="Total Income"
            icon="money"
            number={110}
          />
          <CardDashboard
            color="#F44336"
            title="Total Expenses"
            icon="credit-card"
            number={11220}
          />
          <CardDashboard
            color="#9C27B0"
            title="Balance"
            icon="wallet"
            number={110}
          />
          <CardDashboard
            color="#2196F3"
            title="Saving Goal"
            icon="box"
            number={110}
          />
        </div>

        <div className="flex flex-col w-full items-center">
          <SavingProgress />
        </div>

        <div className="w-full flex items-center justify-center">
          <TabsList />
        </div>
      </section>
    </div>
  );
}

export default App;
