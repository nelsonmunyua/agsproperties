import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./features/home/HomePage";
import SignUp from "./features/auth/SignUp";
import SignIn from "./features/auth/SignIn";
import UserDashboard from "./features/dashboards/user/UserDashboard";
import AgentDashboard from "./features/dashboards/agent/AgentDashboard";
import AdminDashboard from "./features/dashboards/admin/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
