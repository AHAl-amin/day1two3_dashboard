import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

const chartData = [
  { name: "Completed", value: 60, color: "#10B981" },
  { name: "On Going", value: 30, color: "#D97706" },
  { name: "Delay", value: 10, color: "#EF4444" },
]

export default function DashboardHome() {
  return (
    <div >
      <h1 className="text-[40px] font-semibold mb-4 text-[#253240]">Overview</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#E4EAFB] p-6 shadow rounded-md text-center">
          <h2 className="text-2xl font-bold text-[#1E90FF] flex text-[48px] items-center gap-2 justify-center">
            <img src="https://i.ibb.co/7tQfK8dP/octicon-organization-24.png" alt="" className="w-[40px]" />
            20
            </h2>
          <p className="text-[#253240] text-[24px] font-medium mt-1">Total Project</p>
        </div>

        <div className="bg-[#F6EDE3] p-6 shadow rounded-md text-center">
          <h2 className="text-2xl font-bold text-[#F59E0B] flex text-[48px] items-center gap-2 justify-center">$10.M</h2>
          <p className="text-[#253240] text-[24px] font-medium mt-1">Total Loan Value</p>
        </div>

        <div className="bg-[#E0EFEF] p-6 shadow rounded-md text-center">
          <h2 className="text-2xl font-bold text-[#10B981] flex text-[48px] items-center  justify-center">
             <img src="https://i.ibb.co/7N2DS692/Frame.png" alt="" className="w-[40px]" />
            14</h2>
          <p className="text-[#253240] text-[24px] font-medium mt-1">Complete Projects</p>
        </div>

        <div className="bg-[#F6E4E9] p-4 shadow rounded-xl text-center">
         <h2 className="text-2xl font-bold text-[#EF4444] flex text-[48px] items-center gap-2 justify-center">
            <img src="https://i.ibb.co/27vGK9PX/Frame-1.png" alt="" className="w-[40px]" />
            20
            </h2>
          <p className="text-[#253240] text-[24px] font-medium mt-1">Pending</p>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-[40px] font-semibold mb-4 text-[#253240]">Loan Activities</h2>
      <div className="bg-white shadow rounded-xl p-6">
        {/* Placeholder for Chart */}
        <p className="text-center text-gray-400">[Add Donut Chart Here]</p>
      </div>
      </div>
    </div>
  );
}
