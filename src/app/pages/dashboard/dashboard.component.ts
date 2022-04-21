import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';

import {EMPTY, Subscription} from 'rxjs';

import {FormControl, FormGroup, NgForm} from '@angular/forms';

import {MatDialog} from '@angular/material/dialog';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';


import {MatSelect, MatSelectChange} from '@angular/material/select';
import { UtilsService } from 'src/app/services/utils.service';

export interface OrderFilter {
  deliveryStatus?: number;
  checkoutDate?: any;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {


  private subAcRoute: Subscription;



  // Selected Data
  selectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;

  // Store Data



  private subForm: Subscription;

  // Pagination
  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 15;
  totalProductsStore = 0;


  

  // Filter Date Range
  startDate?: string;
  endDate?: string;

  // Form Group
  dataFormRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  // Data Filtering
  isFiltering = false;

  // Max & Min Data
  today = new Date();
  // QUERY
  filterQuery: OrderFilter = null;

  // SEARCH AREA

  isLoading = false;
  isSelect = false;
  searchQuery = null;
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;

  @ViewChild('matSelectFilter') matSelectFilter: MatSelect;

  // DOWNLOADABLE
  dataTypeFormat = 'excel';

  constructor(
    private dialog: MatDialog,

    private spinner: NgxSpinnerService,

  
    
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService,

  ) {
  }

  ngOnInit() {
    
  }


  /**
   * HTTP REQ HANDLE
   */

  // private countsCollectionsDocuments() {
  //   this.dataService.countsCollectionsDocuments()
  //     .subscribe(res => {
  //       this.counts = res.data;
  //     }, error => {
  //       console.log(error);
  //     });
  // }

  /**
   * HTTP Requested Data
   */
  
}
