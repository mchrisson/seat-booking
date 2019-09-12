export interface SeatsResponse {
  gridSize: {
    rowSize: number,
    columnSize: number
  };
  unavailableSeats: GridItem[];
}

export interface GridItem {
  column: number;
  row: number;
}
