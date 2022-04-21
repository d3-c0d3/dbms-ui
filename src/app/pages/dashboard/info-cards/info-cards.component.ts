import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

import * as chartsData from './ngx-charts.config'
@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss']
})
export class InfoCardsComponent implements OnInit, OnDestroy {
  public orders: any[];
  public products: any[];
  public customers: any[];
  public refunds: any[];
  public colorScheme = {
    domain: ['rgba(255,255,255,0.8)']
  };
  public autoScale = true;
  @ViewChild('resizedDiv') resizedDiv: ElementRef;
  public previousWidthOfResizedDiv = 0;

  lineChartMulti = [
    {
        "name": "Germany",
        "series": [
        {
            "name": "2010",
            "value": 700
        },
        {
            "name": "2011",
            "value": 750
        },
        {
            "name": "2012",
            "value": 775
        },
        {
            "name": "2013",
            "value": 725
        },
        {
            "name": "2014",
            "value": 750
        },
        {
            "name": "2015",
            "value": 800
        },
        {
            "name": "2016",
            "value": 860
        }
        ]
    },];
    //Line Charts
    
    lineChartView: any[] = chartsData.lineChartView;

    // options
    lineChartShowXAxis = chartsData.lineChartShowXAxis;
    lineChartShowYAxis = chartsData.lineChartShowYAxis;
    lineChartGradient = chartsData.lineChartGradient;
    lineChartShowLegend = chartsData.lineChartShowLegend;
    lineChartShowXAxisLabel = chartsData.lineChartShowXAxisLabel;
    lineChartXAxisLabel = chartsData.lineChartXAxisLabel;
    lineChartShowYAxisLabel = chartsData.lineChartShowYAxisLabel;
    lineChartYAxisLabel = chartsData.lineChartYAxisLabel;

    lineChartColorScheme = chartsData.lineChartColorScheme;

    // line, area
    lineChartAutoScale = chartsData.lineChartAutoScale;
    lineChartLineInterpolation = chartsData.lineChartLineInterpolation;
    
    constructor() {
        
    }

    

  ngOnInit() {
    this.orders = [];
    this.products = [1,2,3];
    this.customers = [];
    this.refunds = [];
    this.orders = this.addRandomValue('orders');
    this.customers = this.addRandomValue('customers');
  }

  public onSelect(event) {
    // console.log(event);
  }

  public addRandomValue(param) {
    switch (param) {
      case 'orders':
        for (let i = 1; i < 30; i++) {
          this.orders[0].series.push({name: 1980 + i, value: Math.ceil(Math.random() * 1000000)});
        }
        return this.orders;
      case 'customers':
        for (let i = 1; i < 15; i++) {
          this.customers[0].series.push({name: 2000 + i, value: Math.ceil(Math.random() * 1000000)});
        }
        return this.customers;
      default:
        return this.orders;
    }
  }

  ngOnDestroy() {
    this.orders[0].series.length = 0;
    this.customers[0].series.length = 0;
  }

/*   ngAfterViewChecked() {
    if (this.previousWidthOfResizedDiv !== this.resizedDiv.nativeElement.clientWidth) {
      setTimeout(() => this.orders = []);
      setTimeout(() => this.products = []);
      setTimeout(() => this.customers = []);
      setTimeout(() => this.refunds = []);
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  } */

}
