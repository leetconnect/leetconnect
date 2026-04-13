import React from "react";

type JobRow = {
  title: string;
  category: string;
  posted: string;
  proposals: number;
  status: "Active" | "Reviewing" | "Closed";
};

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white p-6">

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-8">
        <input
          type="text"
          placeholder="Search for talent, jobs, or messages..."
          className="bg-[#111] border border-gray-700 rounded-lg px-4 py-2 w-[400px] text-sm outline-none"
        />

        <button className="bg-green-500 hover:bg-green-600 text-black font-medium px-5 py-2 rounded-lg">
          Post a Job
        </button>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Welcome back, Alex!</h1>
        <p className="text-gray-400 text-sm mt-1">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-4 mt-6">

        <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Active Jobs</p>
          <h2 className="text-xl font-semibold mt-2">4</h2>
          <span className="text-green-400 text-sm">↑ 1</span>
        </div>

        <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm">New Proposals</p>
          <h2 className="text-xl font-semibold mt-2">12</h2>
          <span className="text-gray-400 text-sm">from 8 candidates</span>
        </div>

        <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Total Hires</p>
          <h2 className="text-xl font-semibold mt-2">24</h2>
          <span className="text-green-400 text-sm">+3 this month</span>
        </div>

        <div className="bg-[#111] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Total Spend</p>
          <h2 className="text-xl font-semibold mt-2">$45.2k</h2>
        </div>

      </div>

      {/* Table */}
      <div className="bg-[#111] border border-gray-800 rounded-xl mt-8">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <h2 className="font-medium">Recent Job Postings</h2>
          <span className="text-green-400 text-sm cursor-pointer">
            View all
          </span>
        </div>

        {/* Table Head */}
        <div className="grid grid-cols-4 p-4 text-gray-400 text-sm border-b border-gray-800">
          <span>Job Title</span>
          <span>Posted</span>
          <span>Proposals</span>
          <span>Status</span>
        </div>

        {/* Row 1 */}
        <div className="grid grid-cols-4 p-4 items-center border-b border-gray-800">
          <div>
            <p className="font-medium">Senior React Developer</p>
            <p className="text-gray-400 text-sm">Frontend Development</p>
          </div>

          <span className="text-sm text-gray-400">2 hours ago</span>

          <div className="flex -space-x-2">
            <div className="w-8 h-8 bg-gray-500 rounded-full border border-black"></div>
            <div className="w-8 h-8 bg-gray-400 rounded-full border border-black"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full border border-black"></div>
          </div>

          <span className="bg-green-900 text-green-400 px-3 py-1 rounded-full text-xs w-fit">
            Active
          </span>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-4 p-4 items-center border-b border-gray-800">
          <div>
            <p className="font-medium">UX/UI Designer</p>
            <p className="text-gray-400 text-sm">Design</p>
          </div>

          <span className="text-sm text-gray-400">1 day ago</span>

          <div className="flex -space-x-2">
            <div className="w-8 h-8 bg-gray-500 rounded-full border border-black"></div>
            <div className="w-8 h-8 bg-gray-400 rounded-full border border-black"></div>
          </div>

          <span className="bg-green-900 text-green-400 px-3 py-1 rounded-full text-xs w-fit">
            Active
          </span>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-4 p-4 items-center">

          <div>
            <p className="font-medium">Python Backend Architect</p>
            <p className="text-gray-400 text-sm">Backend Development</p>
          </div>

          <span className="text-sm text-gray-400">3 days ago</span>

          <span className="text-gray-400 text-sm">
            No proposals yet
          </span>

          <span className="bg-yellow-900 text-yellow-400 px-3 py-1 rounded-full text-xs w-fit">
            Reviewing
          </span>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;