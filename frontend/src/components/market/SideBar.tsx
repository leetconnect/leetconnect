import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  Users,
  MessageCircle,
  Briefcase,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/userContext";
import { useState } from "react";



const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Homepage", path: "/", icon: Home },
  { name: "Freelancers", path: "/findfreelancer", icon: Users },
  { name: "Chat", path: "/chat", icon: MessageCircle, badge: 3 },
  { name: "My Jobs", path: "/addjob", icon: Briefcase },
];

const menuItem = [
  { name: "Dashboard", path: "/freedashboard", icon: LayoutDashboard },
  { name: "Homepage", path: "/", icon: Home },
  { name: "Jobs", path: "/findclient", icon: Users },
  { name: "Chat", path: "/chat", icon: MessageCircle, badge: 3 },
  { name: "My Proposals", path: "/proposals", icon: Briefcase },
];


const settingsItems = [
  { name: "Profile", path: "/profile", icon: User },
  { name: "Settings", path: "/settings", icon: Settings },
  { name: "Logout", path: "/logout", icon: LogOut },
];

export default function Sidebar() {

  const {user} = useAuth()
  console.log(user, 'user')
  const menu = user?.type === 'CLIENT' ? menuItems : menuItem;
  

  return (
    <aside className="w-64 h-screen bg-black text-gray-300 flex flex-col justify-between border-r border-gray-800">
      
   
      <div>
      
        <div className="px-6 py-5 text-white text-xl font-semibold">
          LeetConnect
        </div>

       
        <nav className="mt-4 px-3 space-y-2">
          {menu.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-2 rounded-lg transition 
                  ${isActive ? "bg-green-900/40 text-green-400" : "hover:bg-gray-800"}`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  {item.name}
                </div>

              
                {item.badge && (
                  <span className="bg-green-500 text-black text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

      
        <div className="mt-6 px-6 text-xs text-gray-500 uppercase">
          Settings
        </div>

        <nav className="mt-2 px-3 space-y-2">
          {settingsItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition 
                  ${isActive ? "bg-green-900/40 text-green-400" : "hover:bg-gray-800"}`
                }
              >
                <Icon size={18} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

    
      <div className="px-4 py-4 border-t border-gray-800 flex items-center gap-3">
        <img
        
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm text-white">Alex Morgan</p>
          <p className="text-xs text-gray-500">Client Account</p>
        </div>
      </div>
    </aside>
  );
}