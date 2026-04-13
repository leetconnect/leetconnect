import React from "react";
import { NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-black text-white flex flex-col p-4">

      {/* Logo */}
      <div className="text-2xl font-bold mb-8">
        Mon App
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-4">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-3 py-2 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700 font-semibold" : ""
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/freelencers"
          className={({ isActive }) =>
            `px-3 py-2 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700 font-semibold" : ""
            }`
          }
        >
          Freelancers
        </NavLink>

        <NavLink
          to="/myJobs"
          className={({ isActive }) =>
            `px-3 py-2 rounded hover:bg-gray-700 ${
              isActive ? "bg-gray-700 font-semibold" : ""
            }`
          }
        >
          My Jobs
        </NavLink>

        <NavLink
          to="/logout"
          className="px-3 py-2 rounded hover:bg-gray-700 text-red-400"
        >
          Déconnexion
        </NavLink>

      </nav>

      {/* Footer */}
      <div className="mt-auto text-gray-400 text-sm">
        © 2026 Mon Application
      </div>

    </div>
  );
};

export default SideBar;