
function SavingProgress() {
  return (
    <div className='bg-[#1F2937] p-8 rounded-lg flex flex-col gap-4  w-full'>
        <h2 className="text-blue-400 text-2xl font-bold">Savings Progress</h2>
        <div>
            <span className='ProgressBar'></span>
            <div className="flex justify-between text-white font-bold">
                <p>Current:</p>
                <p>Goal:</p>
            </div>
        </div>
        <div className="flex justify-center text-blue-400">
            <p>Goal reached</p>
        </div>
    </div>
  )
}

export default SavingProgress