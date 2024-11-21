import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadBuses } from "../redux/slices/seatSlice";
import { PiSteeringWheelDuotone } from "react-icons/pi";
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
  const isAdmin = window.location.pathname.startsWith("/admin/");

  const [selectedBus, setSelectedBus] = useState(busNo || "S091");
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  const buses = useSelector((state: RootState) => state.seats.buses);
  const seats = buses[selectedBus] || [];

  const totalSeats = seats.length;
  const bookedSeats = seats.filter((seat) => seat.isBooked).length;
  const availableSeats = totalSeats - bookedSeats;

  useEffect(() => {
    dispatch(loadBuses());
  }, [dispatch]);

  useEffect(() => {
    if (busNo) {
      setSelectedBus(busNo);
    }
  }, [busNo]);

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
        alert(
          `Seat ${seat.seatNo} is booked by ${seat.bookedBy}\nDestination: ${seat.destination}\nTime: ${seat.time}`
        );
      } else {
        navigate("/booking", {
          state: {
            busNo: selectedBus,
            seatNo: seat.seatNo,
          },
        });
      }
    }
  };

  const getSeatColor = (seat: Seat | undefined) => {
    if (!seat) return "bg-gray-300";
    return seat.isBooked ? "bg-red-500" : "bg-white hover:bg-gray-100";
  };

  const generateSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const seatElements: JSX.Element[] = [];
  
    rows.forEach(row => {
      [1, 2, 3, 4].forEach(col => {
        const seatNo = `${row}${col}`;
        const seat = seats.find(s => s.seatNo === seatNo);
        
        seatElements.push(
          <div
            key={`${row}-${col}`}
            className={`aspect-square rounded-lg ${getSeatColor(seat)} 
              flex items-center justify-center font-bold cursor-pointer
              transition-all duration-200 shadow-md border border-gray-200
              hover:shadow-lg text-gray-700`}
            onClick={() => handleSeatClick(seat)}
          >
            {seatNo}
          </div>
        );
        if (col === 2) {
          seatElements.push(
            <div key={`gap-${row}`} className="w-full" />
          );
        }
      });
    });
  
    return seatElements;
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-6">
                <svg
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800">
                  Bus Details
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Bus Number</span>
                  <span className="font-semibold text-gray-800">
                    {selectedBus}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-blue-600">Available</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {availableSeats}
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-red-600">Booked</p>
                    <p className="text-2xl font-bold text-red-700">
                      {bookedSeats}
                    </p>
                  </div>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => navigate("/admin")}
                    className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Back to Admin
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Select Bus</h3>
              <select
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedBus}
                onChange={(e) => handleBusChange(e.target.value)}
              >
                {Array.from({ length: 9 }, (_, i) => `S0${91 + i}`).map(
                  (bus) => (
                    <option key={bus} value={bus}>
                      {bus}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Seat Layout
              </h2>
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center shadow">
                  <PiSteeringWheelDuotone className="text-gray-600 text-3xl" />
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3 max-w-lg mx-auto">
                {generateSeats()}
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span>Booked</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedSeat && (
        <SeatDetailsModal
          seat={selectedSeat}
          onClose={() => setSelectedSeat(null)}
        />
      )}
    </>
  );
};

export default SeatUI;
