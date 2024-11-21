import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Seat {
  seatNo: string;
  isBooked: boolean;
  bookedBy: string | null;
  destination: string | null;
  time: string | null;
}

interface SeatState {
  buses: Record<string, Seat[]>;
}

interface BookSeatPayload {
  busNo: string;
  seatNo: string;
  bookedBy: string;
  destination: string;
  time: string;
}

const initialState: SeatState = {
  buses: JSON.parse(localStorage.getItem("buses") || "{}")
};

const seatSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    loadBuses: (state) => {
      state.buses = JSON.parse(localStorage.getItem("buses") || "{}");
    },
    bookSeat: (state, action: PayloadAction<BookSeatPayload>) => {
      const { busNo, seatNo, bookedBy, destination, time } = action.payload;
      
      if (state.buses[busNo]) {
        const updatedBuses = {
          ...state.buses,
          [busNo]: state.buses[busNo].map(seat =>
            seat.seatNo === seatNo
              ? { ...seat, isBooked: true, bookedBy, destination, time }
              : seat
          )
        };
        localStorage.setItem("buses", JSON.stringify(updatedBuses));
        state.buses = updatedBuses;
      }
    }
  }
});

export const { loadBuses, bookSeat } = seatSlice.actions;
export default seatSlice.reducer;
