export default function DashboardHome() {
  return (
    <div >
      <h1 className="text-2xl font-semibold mb-4">Overview</h1>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded-xl text-center">
          <h2 className="text-2xl font-bold text-blue-600">20</h2>
          <p className="text-gray-600 mt-1">Total Project</p>
        </div>
        <div className="bg-white p-4 shadow rounded-xl text-center">
          <h2 className="text-2xl font-bold text-yellow-500">$10.M</h2>
          <p className="text-gray-600 mt-1">Total Loan Value</p>
        </div>
        <div className="bg-white p-4 shadow rounded-xl text-center">
          <h2 className="text-2xl font-bold text-green-600">14</h2>
          <p className="text-gray-600 mt-1">Complete Projects</p>
        </div>
        <div className="bg-white p-4 shadow rounded-xl text-center">
          <h2 className="text-2xl font-bold text-red-500">3</h2>
          <p className="text-gray-600 mt-1">Pending</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">Loan Activities</h2>
      <div className="bg-white shadow rounded-xl p-6">
        {/* Placeholder for Chart */}
        <p className="text-center text-gray-400">[Add Donut Chart Here]</p>
      </div>
    </div>
  );
}
