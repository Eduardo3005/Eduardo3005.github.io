import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Houses',
  templateUrl: './Houses.component.html',
  styleUrls: ['./Houses.component.css']
})
export class HousesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getHouses();
  }

  getHouses(): void {
  }
}
