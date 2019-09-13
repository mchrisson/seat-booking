import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SeatsResponse, GridItem } from '../model/interfaces/seats-response';
import { Seat } from '../model/seat';
import { SeatStatus } from '../model/enums/seat-status';
import { skip } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeatsDataService {

  private seatsGrid: Seat[][] = new Array<Array<Seat>>();
  private seatsGridSource = new BehaviorSubject(this.seatsGrid);
  seatsGridObservable$ = this.seatsGridSource.asObservable();

  constructor(private http: HttpClient) { }

  initState() {
    this.http.get('assets/data/seats.data.json').subscribe((resData: SeatsResponse) => {
      for (let i = 0; i < resData.gridSize.rowSize; i++) {
        const seatsRow: Seat[] = [];
        for (let j = 0; j < resData.gridSize.columnSize; j++) {
          seatsRow.push(new Seat());
        }
        this.seatsGrid.push(seatsRow);
      }
      for (const unavailableSeat of resData.unavailableSeats) {
        this.seatsGrid[unavailableSeat.row][unavailableSeat.column].status = SeatStatus.Unavailable;
      }
      if (localStorage.selectedSeats) {
        const selectedSeats = JSON.parse(localStorage.selectedSeats);
        for (const key of Object.keys(selectedSeats)) {
          const [ row, column ] = key.split(',');
          this.seatsGrid[row][column].status = SeatStatus.Selected;
        }
      } else {
        localStorage.selectedSeats = JSON.stringify({});
      }

      this.seatsGridSource.next(this.seatsGrid);
    }, error => console.log(error));
  }

  getObserver(): Observable<Seat[][]> {
    return this.seatsGridObservable$.pipe(skip(1));
  }

  updateState(seatToUpdate: Seat, seatLocation: GridItem) {
    this.seatsGrid[seatLocation.row][seatLocation.column] = seatToUpdate;
    this.seatsGridSource.next(this.seatsGrid);
    const selectedSeats = JSON.parse(localStorage.selectedSeats);
    if ( seatToUpdate.status === SeatStatus.Selected ) {
      selectedSeats[`${seatLocation.row},${seatLocation.column}`] = seatToUpdate;
    } else {
      delete selectedSeats[`${seatLocation.row},${seatLocation.column}`];
    }
    localStorage.selectedSeats = JSON.stringify(selectedSeats);
  }
}
