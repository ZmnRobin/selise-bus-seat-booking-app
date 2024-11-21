import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadBuses } from "../redux/slices/seatSlice";
import type { RootState } from "../redux/store";
import type { AppDispatch } from "../redux/store";
import SeatDetailsModal from "../components/SeatDetailsModal";

interface Seat {
  seatNo: string;
  isBooked: boolean;
  bookedBy: string | null;
  destination: string | null;
  time: string | null;
}

const SeatUI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { busNo } = useParams();
  const isAdmin = window.location.pathname.startsWith('/admin/');
  
  const [selectedBus, setSelectedBus] = useState(busNo || "S091");
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  
  const buses = useSelector((state: RootState) => state.seats.buses);
  const seats = buses[selectedBus] || [];

  useEffect(() => {
    dispatch(loadBuses());
  }, [dispatch]);

  useEffect(() => {
    if (busNo) {
      setSelectedBus(busNo);
    }
  }, [busNo]);

  const handleBackToAdmin = () => {
    navigate("/admin");
  };

  const handleBusChange = (newBusNo: string) => {
    setSelectedBus(newBusNo);
    if (isAdmin) {
      navigate(`/admin/${newBusNo}`);
    }
  };

  const handleSeatClick = (seat: Seat | undefined) => {
    if (!seat) return;
    
    if (isAdmin) {
      setSelectedSeat(seat);
    } else {
      if (seat.isBooked) {
        alert(`Seat ${seat.seatNo} is booked by ${seat.bookedBy}\nDestination: ${seat.destination}\nTime: ${seat.time}`);
      } else {
        navigate("/booking", { 
          state: { 
            busNo: selectedBus, 
            seatNo: seat.seatNo 
          } 
        });
      }
    }
  };

  const getSeatColor = (seat: Seat | undefined) => {
    if (!seat) return "bg-gray-300";
    return seat.isBooked ? "bg-gray-500" : "bg-white hover:bg-gray-300";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {isAdmin ? "Admin View - " : ""}BUS NO - {selectedBus}
        </h1>
        <div className="flex gap-4 items-center">
          <select
            className="p-2 border rounded-md"
            value={selectedBus}
            onChange={(e) => handleBusChange(e.target.value)}
          >
            {Array.from({ length: 9 }, (_, i) => `S0${91 + i}`).map((bus) => (
              <option key={bus} value={bus}>{bus}</option>
            ))}
          </select>
          {isAdmin && (
            <button
              onClick={handleBackToAdmin}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Back to Admin
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-end mb-8 mr-10">
          <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center font-bold">
            Driver
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
          {Array.from({ length: 20 }, (_, index) => {
            const seatNo = `${Math.floor(index/2) + 1}${index % 2 === 0 ? 'A' : 'B'}`;
            const seat = seats.find(s => s.seatNo === seatNo);

            return (
              <div
                key={seatNo}
                className={`w-full aspect-square rounded-lg ${getSeatColor(seat)} 
                  flex items-center justify-center font-bold cursor-pointer
                  transition-colors duration-200 shadow border border-gray-300 text-black`}
                onClick={() => handleSeatClick(seat)}
              >
                {seatNo}
              </div>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bgwhite rounded border border-gray-300"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-500 rounded"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>

      {selectedSeat && (
        <SeatDetailsModal
          seat={selectedSeat} 
          onClose={() => setSelectedSeat(null)} 
        />
      )}
    </div>
  );
};

export default SeatUI;
