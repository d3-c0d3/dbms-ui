import { Component, OnInit } from '@angular/core';

import {MatSelectChange} from '@angular/material/select';

import { NonNullAssert } from '@angular/compiler';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {
  products:Number;
  orders: Number;
  users: Number;
  transactions: Number;



  // Query;
  query: any = null;

  constructor(
    private utilsService: UtilsService,

  ) { }

  ngOnInit(
    ): void {
      this.fetchData();
  }

  onFilterData(event: MatSelectChange) {
    if (event.source.value) {
      const startDate = this.utilsService.getDateBySubtract(event.source.value, null, true);
      const endDate = this.utilsService.getDateString(new Date());
      this.query = {dateString: {$gte: startDate, $lt: endDate}};
      this.fetchData();
    } else {
      const startDate = this.utilsService.getDateBySubtract(1, null, true);
      const endDate = this.utilsService.getDateString(new Date());
      this.query = {dateString: {$gte: startDate, $lt: endDate}};
      this.fetchData();
    }

  }
  fetchData(){
    
  }
}
