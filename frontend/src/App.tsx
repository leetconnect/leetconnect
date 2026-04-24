// // import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Landing from './pages/Landing';
// import Privacy from './pages/Privacy';
// import Terms from './pages/Terms';
// import About from './pages/About';
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Dashboard from './pages/market/Dashboard';
// import Messages from './pages/chat/Messages';
// import Admin from './pages/admin/Admin';
// import Layout from './components/Layout';
// // import Theme from './components/ThemeShowcase';
// // import Navbar from './components/Navbar';
// import { ScrollToTop } from './components/ScrollToTop';

// export default function App() {
//   return (
//     <>
//       <ScrollToTop />
//       <Routes>
//         {/*Public routes*/}
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/privacy" element={<Privacy />} />
//         <Route path="/terms" element={<Terms />} />

//         {/*authenticated routes (with shared layout)*/}
//         <Route element={<Layout />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/messages" element={<Messages />} />
//           <Route path="/admin" element={<Admin />} />
//         </Route>
//       </Routes>
//     </>
//   );
// }


import { Routes, Route } from "react-router-dom";

import SideBar from "./components/market/SideBar";
import PostJob from "./pages/market/PostJob";
import Freelencers from "./pages/market/Freelencers";
import Dashboard from "./pages/market/Dashbord";
import FreelancerDashboardPage from "./pages/market/FreelancerDashboardPage";
import FindClients from "./pages/market/FindClients";
import JobDetails from "./pages/market/JobDetails";

// import { Routes, Route } from "react-router-dom";
// import SideBar from "./components/SideBar";
// import Dashboard from "./pages/Dashboard";
// import PostJob from "./pages/PostJob";
// import Freelencers from "./pages/Freelencers";
// import FindClients from "./pages/FindClients";
// import FreelancerDashboardPage from "./pages/FreelancerDashboardPage";

function App() {
  // 🔥 change ici pour tester
  const auth = "freelancer"; // "client" ou "freelancer"



  return (
    <div className="flex h-screen">
      <SideBar />

      <div className="flex-1 overflow-auto">
        <Routes>
          
          <Route
            path="/"
            element={auth === "client" ? (<Dashboard />) : (
                <FreelancerDashboardPage />
              )
            }
          />

          {/* Routes CLIENT */}
          {auth === "client" && (
            <>
              <Route path="/myJobs" element={<PostJob />} />
              <Route path="/freelencers" element={<Freelencers />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
            </>
          )}

          {/* Routes FREELANCER */}
          {auth === "freelancer" && (
            <>
              <Route
                path="/freelencers"
                element={<FindClients />}
              />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;