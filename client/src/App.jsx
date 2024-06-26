import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";
import Login from "./components/Login";
import Register from "./components/Register";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";



export default function App() {

  return (

    <div className="font-mono flex dark:bg-slate-800 w-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className='pl-5 sm:pl-0 flex-1 min-h-screen w-full text-gray-400 '>

          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route index path="/" element={<HomePage />} />
            <Route path="/employees" element={<Employees />} />
            {/* <Route path="/payroll" element={<Payroll />} /> */}
            <Route path="/attendance" element={<Attendance />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </div>
      </div>
    </div >
  );
}
