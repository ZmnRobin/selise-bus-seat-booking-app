import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Seat {
  busNo: string;
  seatNo: string;
  isBooked: boolean;
  bookedBy?: string;
  destination?: string;
  time?: string;
}

interface SeatState {
  buses: Record<string, Seat[]>;
  loading: boolean;
  error: string | null;
}

const initialState: SeatState = {
  buses: {},
  loading: false,
  error: null
};

export const loadBuses = createAsyncThunk(
  'seats/loadBuses',
  async () => {
    const buses = JSON.parse(localStorage.getItem("buses") || "{}");
    return buses;
  }
);

export const bookSeatAsync = createAsyncThunk(
  'seats/bookSeat',
  async (bookingData: { busNo: string; seatNo: string; bookedBy: string; destination: string; time: string }) => {
    const buses = JSON.parse(localStorage.getItem("buses") || "{}");
    const updatedBuses = {
      ...buses,
      [bookingData.busNo]: buses[bookingData.busNo].map((seat: Seat) =>
        seat.seatNo === bookingData.seatNo
          ? { ...seat, isBooked: true, ...bookingData }
          : seat
      )
    };
    localStorage.setItem("buses", JSON.stringify(updatedBuses));
    return bookingData;
  }
);

const seatSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadBuses.fulfilled, (state, action) => {
        state.buses = action.payload;
        state.loading = false;
      })
      .addCase(bookSeatAsync.fulfilled, (state, action) => {
        const { busNo, seatNo, bookedBy, destination, time } = action.payload;
        if (state.buses[busNo]) {
          const seat = state.buses[busNo].find(s => s.seatNo === seatNo);
          if (seat) {
            seat.isBooked = true;
            seat.bookedBy = bookedBy;
            seat.destination = destination;
            seat.time = time;
          }
        }
      });
  }
});

export default seatSlice.reducer;
