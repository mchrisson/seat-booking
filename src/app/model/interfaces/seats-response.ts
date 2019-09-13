export interface SeatsResponse {
  gridSize: {
    rowSize: number,
    columnSize: number
  };
  unavailableSeats: GridItem[];
}

export interface GridItem {
  row: number;
  column: number;
}
