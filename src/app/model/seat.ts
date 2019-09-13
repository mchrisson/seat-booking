import { SeatStatus } from './enums/seat-status';

export class Seat {
  constructor(status = SeatStatus.Available) {
    this.status = status;
  }
  status: SeatStatus;
}
