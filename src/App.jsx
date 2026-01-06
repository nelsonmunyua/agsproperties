import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./features/home/HomePage";
import SignUp from "./features/auth/SignUp";
import SignIn from "./features/auth/SignIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;