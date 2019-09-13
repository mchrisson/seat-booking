import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeatsDataService } from 'src/app/services/seats-data.service';
import { Seat } from 'src/app/model/seat';
import { Subscription } from 'rxjs';
import { SeatStatus } from 'src/app/model/enums/seat-status';

@Component({
  selector: 'sb-seats-container',
  templateUrl: './seats-container.component.html',
  styleUrls: ['./seats-container.component.scss']
})
export class SeatsContainerComponent implements OnInit, OnDestroy {

  constructor(private seatDataService: SeatsDataService) { }
  subscriptions: Subscription[] = [];
  seatsGrid: Seat[][];

  ngOnInit() {
    const sub1 = this.seatDataService.getObserver().subscribe((data: Seat[][]) => {
      this.seatsGrid = data;
    });
    this.subscriptions.push(sub1);
    this.seatDataService.initState();
  }

  selectSeat(row: number, column: number) {
    if ( this.seatsGrid[row][column].status === SeatStatus.Available ) {
      this.seatDataService.updateState(new Seat(SeatStatus.Selected), { row, column });
    } else if ( this.seatsGrid[row][column].status === SeatStatus.Selected ) {
      this.seatDataService.updateState(new Seat(SeatStatus.Available), { row, column });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
