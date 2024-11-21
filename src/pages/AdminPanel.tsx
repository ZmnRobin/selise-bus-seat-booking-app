import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { loadBuses } from "../redux/slices/seatSlice";

const AdminPanel = () => {
  const [selectedBus, setSelectedBus] = useState("S091");
  const navigate = useNavigate();
  const buses = useSelector((state: RootState) => state.seats.buses);
  const dispatch = useDispatch<any>();

  const handleViewDetails = () => {
    navigate(`/admin/${selectedBus}`);
  };

  const getBusStatus = (busNo: string) => {
    if (!buses || !buses[busNo]) return "0/9 seats booked";
    
    const bus = buses[busNo];
    const totalSeats = 20;
    const bookedSeats = bus.filter(seat => seat.isBooked).length;
    return `${bookedSeats}/${totalSeats} seats booked`;
  };

  useEffect(() => {
    dispatch(loadBuses());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Select Bus</h2>
        <select
          className="w-full p-3 border rounded-lg mb-4"
          value={selectedBus}
          onChange={(e) => setSelectedBus(e.target.value)}
        >
          {Array.from({ length: 9 }, (_, i) => `S0${91 + i}`).map((bus) => (
            <option key={bus} value={bus}>
              {bus} - {getBusStatus(bus)}
            </option>
          ))}
        </select>
        <button 
          onClick={handleViewDetails} 
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          View Details of {selectedBus}
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
