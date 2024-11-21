import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bookSeatAsync } from "../redux/slices/seatSlice";

interface LocationState {
  busNo: string;
  seatNo: string;
}

const Booking = () => {
  const location = useLocation();
  const seat = location.state as LocationState;
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const destination = form.get("destination") as string;
    const time = form.get("time") as string;

    if (!seat || !seat.busNo || !seat.seatNo) {
      alert("Invalid seat selection!");
      return;
    }

    dispatch(
      bookSeatAsync({
        busNo: seat.busNo,
        seatNo: seat.seatNo,
        bookedBy: name,
        destination,
        time,
      })
    ).then(() => {
      alert(`Seat ${seat.seatNo} on ${seat.busNo} booked successfully!`);
      navigate("/");
    });
  };

  if (!seat || !seat.busNo || !seat.seatNo) {
    return <div>Invalid seat selection</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="relative bg-white py-5 shadow rounded px-6 sm:w-[500px] md:w-[600px] lg:w-[700px]">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="block font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Book Your Seat</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed mt-2">
                  Please fill in the details to book your seat
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex flex-col">
                  <label className="leading-loose font-medium text-gray-600">
                    Bus Details
                  </label>
                  <div className="text-sm text-gray-500 mt-1 mb-4">
                    <p>
                      Bus No:{" "}
                      <span className="font-semibold text-gray-700">
                        {seat.busNo}
                      </span>
                    </p>
                    <p>
                      Seat No:{" "}
                      <span className="font-semibold text-gray-700">
                        {seat.seatNo}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose font-medium text-gray-600">
                    Your Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    required
                  />
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose font-medium text-gray-600">
                    Destination
                  </label>
                  <select
                    name="destination"
                    className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    required
                  >
                    <option value="">Select Destination</option>
                    <option value="Mirpur">Mirpur</option>
                    <option value="Dhanmondi">Dhanmondi</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose font-medium text-gray-600">
                    Time Slot
                  </label>
                  <select
                    name="time"
                    className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    required
                  >
                    <option value="">Select Time</option>
                    <option value="8:00 AM">8:00 AM</option>
                    <option value="9:00 AM">9:00 AM</option>
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="6:00 PM">6:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none hover:bg-gray-100 transition-colors border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-blue-600 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
