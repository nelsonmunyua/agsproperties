import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./features/home/HomePage";
import SignUp from "./features/auth/SignUp";
import SignIn from "./features/auth/SignIn";
import UserDashboard from "./features/dashboards/user/UserDashboard";
import UserProfile from "./features/dashboards/user/UserProfile";
import AgentDashboard from "./features/dashboards/agent/AgentDashboard";
import AdminDashboard from "./features/dashboards/admin/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Properties from "./pages/user/Properties";
import AgentProperties from "./pages/agent/Properties";
import AgentPropertyDetails from "./pages/agent/PropertyDetails";
import AgentPropertyForm from "./pages/agent/PropertyForm";
import PropertyDetails from "./features/dashboards/user/PropertyDetails";
import FavoritesPage from "./features/dashboards/user/FavoritesPage";
import Messages from "./features/dashboards/user/Messages";

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
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/favorites" element={<FavoritesPage />} />
          <Route path="/user/messages" element={<Messages />} />
          <Route path="/user/messages/:conversationId" element={<Messages />} />
          <Route path="/user/properties" element={<Properties />} />
          <Route path="/user/property/:id" element={<PropertyDetails />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/agent/properties" element={<AgentProperties />} />
          <Route path="/agent/properties/new" element={<AgentPropertyForm />} />
          <Route path="/agent/properties/:id" element={<AgentPropertyDetails />} />
          <Route path="/agent/properties/:id/edit" element={<AgentPropertyForm />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

