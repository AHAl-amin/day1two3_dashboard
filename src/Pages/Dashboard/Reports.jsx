"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import ProjectOverview from "./ProjectOverview"
import ReportsProjectOverview from "./ReportsProjectOverview"

const chartData = [
  { name: "Completed", value: 60, color: "#10B981" },
  { name: "On Going", value: 30, color: "#D97706" },
  { name: "Delay", value: 10, color: "#EF4444" },
]

const CustomLegend = () => {
  return (
    <div className="flex flex-col space-y-4 mr-20">
      
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

export default function Reports() {
  return (
    <section>
      <div className="pb-10 border-b border-[#C7C7C7]">
     
     
      <div className="mt-20">
        <div className="bg-white shadow rounded-xl p-6 ">
        <h2 className="text-[40px] md:ml-16 font-semibold mb-4 text-[#253240]">Report</h2>
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
      <ReportsProjectOverview/>
    </div>
    </section>
  )
}
