import { Component, OnInit, Input } from '@angular/core';
import { Seat } from 'src/app/model/seat';
import { SeatStatus } from 'src/app/model/enums/seat-status';

@Component({
  selector: 'sb-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.scss']
})
export class SeatComponent implements OnInit {

  constructor() { }

  @Input() seat: Seat;

  ngOnInit() {
  }

  setStatusColor() {
    return {
      selected: this.seat.status === SeatStatus.Selected,
      unavailable: this.seat.status === SeatStatus.Unavailable
    };
  }

}
