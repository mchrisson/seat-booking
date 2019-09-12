import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SeatsResponse } from '../model/interfaces/seats-response';
import { Seat } from '../model/seat';
import { SeatStatus } from '../model/enums/seat-status';
import { skip } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SeatsDataService {

  private seatsGrid: Seat[][] = new Array<Array<Seat>>();
  private seatsDataSource = new BehaviorSubject(this.seatsGrid);
  seatsData$ = this.seatsDataSource.asObservable();

  constructor(private http: HttpClient) { }

  init(): Observable<Seat[][]> {
    this.http.get('assets/data/seats.data.json').subscribe((resData: SeatsResponse) => {
      for (let i = 0; i < resData.gridSize.rowSize; i++) {
        const seatsRow: Seat[] = [];
        for (let j = 0; j < resData.gridSize.rowSize; j++) {
          seatsRow.push(new Seat());
        }
        this.seatsGrid.push(seatsRow);
      }
      for (const unavailableSeat of resData.unavailableSeats) {
        this.seatsGrid[unavailableSeat.row][unavailableSeat.column].status = SeatStatus.Unavailable;
      }

      this.seatsDataSource.next(this.seatsGrid);
    }, error => console.log(error));
    return this.seatsData$.pipe(skip(1));
  }
}
