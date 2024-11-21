import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import AdminPanel from "./pages/AdminPanel";
import SeatUI from "./pages/SeatUI";
import Booking from "./pages/Booking";
import { initializeData } from "./utils/localStorage";
import Navbar from "./components/Navbar";

function App() {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar/>
        <Routes>
          <Route path="/" element={<SeatUI />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/:busNo" element={<SeatUI />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
