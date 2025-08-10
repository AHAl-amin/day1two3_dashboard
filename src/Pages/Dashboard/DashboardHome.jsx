"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import ProjectOverview from "./ProjectOverview"

const chartData = [
  { name: "Completed", value: 60, color: "#10B981" },
  { name: "On Going", value: 30, color: "#D97706" },
  { name: "Delay", value: 10, color: "#EF4444" },
]

const CustomLegend = () => {
  return (
    <div className="flex flex-col space-y-4 mr-20">
      <h3 className="text-[28px] font-semibold text-[#253240] mb-10">Report</h3>
      <div className="flex items-center space-x-3">
        <span className="text-[#253240] font-medium">Completed</span>
        <div className="w-4 h-4 rounded-full bg-[#10B981]" />
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-[#253240] font-medium">On Going</span>
        <div className="w-4 h-4 rounded-full bg-[#D97706]" />
      </div>
      <div className="flex items-center space-x-3">
        <span className="text-[#253240] font-medium">Delay</span>
        <div className="w-4 h-4 rounded-full bg-[#EF4444]" />
      </div>
    </div>
  )
}

const renderCustomizedLabel = (entry) => {
  const { cx, cy, midAngle, outerRadius, value } = entry
  const RADIAN = Math.PI / 180
  const radius = outerRadius + 30
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="#253240"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="font-semibold text-lg"
    >
      {`${value}%`}
    </text>
  )
}

export default function DashboardHome() {
  return (
    <section>
      <div className="pb-10 border-b border-[#C7C7C7]">
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
          <h2 className="text-2xl font-bold text-[#F59E0B] flex text-[48px] items-center gap-2 justify-center">
            $10.M
          </h2>
          <p className="text-[#253240] text-[24px] font-medium mt-1">Total Loan Value</p>
        </div>
        <div className="bg-[#E0EFEF] p-6 shadow rounded-md text-center">
          <h2 className="text-2xl font-bold text-[#10B981] flex text-[48px] items-center justify-center">
            <img src="https://i.ibb.co/7N2DS692/Frame.png" alt="" className="w-[40px]" />
            14
          </h2>
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
        <div className="bg-white shadow rounded-xl p-6 ">
          <div className="flex items-center justify-between ">
            <div className="basis-6/12 ps-16">
               <CustomLegend />
            </div>
            <div className="flex-1 h-80 basis-6/12">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart className="border-none ">
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    className=""
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    innerRadius={50}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="none"
                    style={{ outline: "none" }}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" style={{ outline: "none" }} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* project overview */}

    <div className="py-10">
      <ProjectOverview/>
    </div> 
    <div className="flex items-center justify-center space-x-2 py-4">
      <button className="px-3 py-1 text-gray-500 hover:text-gray-700  cursor-pointer">Back</button>
      <button className="px-3 py-1 bg-[#1E90FF] text-white rounded-full cursor-pointer hover:bg-blue-600">1</button>
      <button className="px-3 py-1 text-gray-500 hover:text-gray-700 cursor-pointer">2</button>
      <button className="px-3 py-1 text-gray-500 hover:text-gray-700 cursor-pointer">3</button>
      <button className="px-3 py-1 text-gray-500 hover:text-gray-700 cursor-pointer">4</button>
      <button className="px-3 py-1 text-gray-500 hover:text-gray-700 cursor-pointer">5</button>
      <button className="px-3 py-1 text-gray-500 hover:text-gray-700 cursor-pointer">6</button>
      <button className="px-3 py-1 text-gray-500 hover:text-gray-700 cursor-pointer">7</button>
      <button className="px-3 py-1 text-gray-500 hover:text-gray-700 cursor-pointer">8</button>
      <span className="px-2 text-gray-500">...</span>
      <button className="px-3 py-1 text-gray-500 hover:text-gray-700 cursor-pointer">25</button>
      <button className="px-3 py-1 text-gray-500 hover:text-gray-700 cursor-pointer">Next</button>
    </div>
    </section>
  )
}
