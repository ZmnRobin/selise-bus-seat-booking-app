interface Seat {
    seatNo: string;
    isBooked: boolean;
    bookedBy: string | null;
    destination: string | null;
    time: string | null;
}
  
interface SeatDetailsModalProps {
    seat: Seat;
    onClose: () => void;
  }
  
  const SeatDetailsModal = ({ seat, onClose }: SeatDetailsModalProps) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">Seat Details</h2>
          <div className="space-y-3">
            <p><span className="font-semibold">Seat Number:</span> {seat.seatNo}</p>
            <p><span className="font-semibold">Status:</span> {seat.isBooked ? 'Booked' : 'Available'}</p>
            {seat.isBooked && (
              <>
                <p><span className="font-semibold">Booked By:</span> {seat.bookedBy}</p>
                <p><span className="font-semibold">Destination:</span> {seat.destination}</p>
                <p><span className="font-semibold">Time:</span> {seat.time}</p>
              </>
            )}
          </div>
          <button 
            onClick={onClose}
            className="mt-6 w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

export default SeatDetailsModal;
