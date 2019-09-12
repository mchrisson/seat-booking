import { Component, OnInit } from '@angular/core';
import { SeatsDataService } from 'src/app/services/seats-data.service';
import { Seat } from 'src/app/model/seat';

@Component({
  selector: 'sb-seats-container',
  templateUrl: './seats-container.component.html',
  styleUrls: ['./seats-container.component.scss']
})
export class SeatsContainerComponent implements OnInit {

  constructor(private seatDataService: SeatsDataService) { }

  ngOnInit() {
    let sub1 = this.seatDataService.init().subscribe((data: Seat[][]) => {
      console.log(data);
    });
  }

}
