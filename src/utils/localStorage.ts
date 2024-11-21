interface Bus {
  seatNo: string;
  isBooked: boolean;
  bookedBy: string | null;
  destination: string | null;
  time: string | null;
}

interface Buses {
  [key: string]: Bus[];
}

export const initializeData = () => {
  const buses: Buses = {};
  const rows = ['A', 'B', 'C', 'D', 'E'];
  
  for (let i = 91; i <= 99; i++) {
    const busNo = `S0${i}`;
    const seats: Bus[] = [];
    
    for (let row of rows) {
      for (let col = 1; col <= 4; col++) {
        seats.push({
          seatNo: `${row}${col}`,
          isBooked: false,
          bookedBy: null,
          destination: null,
          time: null
        });
      }
    }
    
    buses[busNo] = seats;
  }

  if (!localStorage.getItem("buses")) {
    localStorage.setItem("buses", JSON.stringify(buses));
  }
};
  