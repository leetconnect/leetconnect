import React from "react";

type Invitation = {
  title: string;
  client: string;
  posted: string;
  budget: string;
  timeLeft: string;
};

type Proposal = {
  title: string;
  client: string;
  status: "Interviewing" | "Submitted" | "Accepted" | "Rejected";
};

const FreelancerDashboardPage: React.FC = () => {
  const invitations: Invitation[] = [
    {
      title: "Backend Developer for Node.js Project",
      client: "John Smith",
      posted: "1 hour ago",
      budget: "$2,500",
      timeLeft: "1 day left",
    },
    {
      title: "Frontend Developer for SaaS Platform",
      client: "Emily Davis",
      posted: "2 hours ago",
      budget: "$1,800",
      timeLeft: "3 days left",
    },
    {
      title: "Mobile UX/UI Designer",
      client: "Tech Innovations",
      posted: "4 hours ago",
      budget: "$3,000",
      timeLeft: "5 days left",
    },
  ];

  const proposals: Proposal[] = [
    {
      title: "Senior React Developer",
      client: "GreenWave Tech",
      status: "Interviewing",
    },
    {
      title: "Python Backend Developer",
      client: "InnovateX Solutions",
      status: "Submitted",
    },
  ];

  const stats: [string, string][] = [
    ["Active Proposals", "7"],
    ["Interviews", "2 ↑1"],
    ["Active Contracts", "4 ↑1"],
    ["Total Earnings", "$12,350"],
  ];

  return (
    <div className="min-h-screen bg-black text-white flex">

      <main className="flex-1 p-8">

       
        <div className="flex justify-between items-center mb-10">
          <input
            placeholder="Search for jobs, clients, or messages..."
            className="bg-zinc-950 border border-zinc-800 rounded-xl px-6 py-4 w-[500px] text-zinc-300 outline-none"
          />

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl font-semibold">
            Browse Jobs
          </button>
        </div>

      
      <div>
        <h1 className="text-2xl font-semibold">Welcome back, Alex!</h1>
        <p className="text-gray-400 text-sm mt-1">
          Here's what's happening with your projects today.
        </p>
      </div>

      
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
        
        <section className="bg-zinc-950 border border-zinc-800 rounded-2xl mb-10">

          <div className="flex justify-between p-6 border-b border-zinc-800">
            <h2 className="text-3xl font-semibold">
              Recent Job Invitations
            </h2>
            <button className="text-green-400">View all</button>
          </div>

          {invitations.map((job) => (
            <div
              key={job.title}
              className="grid grid-cols-5 p-6 border-b border-zinc-800 items-center"
            >
              <div>
                <p className="font-semibold text-lg">{job.title}</p>
                <p className="text-zinc-400">{job.client}</p>
              </div>

              <p>{job.posted}</p>
              <p>{job.budget}</p>
              <span className="text-green-400">{job.timeLeft}</span>

              <button className="bg-zinc-900 px-5 py-2 rounded-lg border border-zinc-700">
                View
              </button>
            </div>
          ))}
        </section>

      
        <section className="bg-zinc-950 border border-zinc-800 rounded-2xl">

          <div className="flex justify-between p-6 border-b border-zinc-800">
            <h2 className="text-3xl font-semibold">
              My Active Proposals
            </h2>
            <button className="text-green-400">View all</button>
          </div>

          {proposals.map((proposal) => (
            <div
              key={proposal.title}
              className="grid grid-cols-4 p-6 border-b border-zinc-800 items-center"
            >
              <div>
                <p className="font-semibold text-lg">{proposal.title}</p>
                <p className="text-zinc-400">{proposal.client}</p>
              </div>

              <p>{proposal.client}</p>

              <span
                className={`w-fit px-4 py-2 rounded-full text-sm ${
                  proposal.status === "Interviewing"
                    ? "bg-yellow-900/40 text-yellow-400"
                    : "bg-green-900/40 text-green-400"
                }`}
              >
                {proposal.status}
              </span>

              <button className="text-green-400">View</button>
            </div>
          ))}

        </section>

      </main>
    </div>
  );
};

export default FreelancerDashboardPage;