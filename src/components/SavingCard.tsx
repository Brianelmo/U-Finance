

function SavingCard() {
  return (
    <div className="p-10 bg-[#1F2937] rounded-lg flex flex-col gap-10">
      <h3 className="text-[#2196F3] text-3xl font-bold">Set savings goal</h3>
      <div className="flex flex-col gap-1">
        <label className="text-white font-bold" htmlFor="">
          Desired Savings Amount
        </label>
        <input
          className="bg-[#09090B] text-white px-2 py-1 rounded-lg outline-none"
          type="number"
          placeholder="0.00"
          name=""
          id=""
        />
      </div>
      <button className="bg-[#2196F3] text-white p-2 rounded-lg cursor-pointer">
        Set Saving Goal
      </button>
    </div>
  );
}

export default SavingCard;
