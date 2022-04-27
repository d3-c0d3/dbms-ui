import { Component, OnInit, ViewChild } from '@angular/core';
import { MatOption, MatOptionSelectionChange } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { YEARS } from 'src/app/core/utils/date-data';
import { Pagination } from 'src/app/interfaces/pagination';
import { Select } from 'src/app/interfaces/select';
import { ReloadService } from 'src/app/services/reload.service';
import { RevinewService } from 'src/app/services/revinew.service';
import { SchoolService } from 'src/app/services/school.service';
import { SectionService } from 'src/app/services/section.service';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-department-wise-comparison',
  templateUrl: './department-wise-comparison.component.html',
  styleUrls: ['./department-wise-comparison.component.scss'],
})
export class DepartmentWiseComparisonComponent implements OnInit {
  // Subscriptions
  private subProduct: Subscription;
  private subCat: Subscription;
  private subSubCat: Subscription;
  private subAcRoute: Subscription;
  private subForm: Subscription;
  private subDataOne?: Subscription;

  yearSelector = YEARS;
  // Store Data
  revinew: any[] = []; //revinew
  private holdPrevData: any[] = [];
  schools: any[] = ['sets']; //school
  years = YEARS; //semester
  semesters: Select[] = [
    { value: 'Summer', viewValue: 'Summer' },
    { value: 'Autumn', viewValue: 'Autumn' },
    { value: 'Spring', viewValue: 'Spring' },
  ];
  slots=[7,8]
  sectionSize=[
    {viewValue:'1-10',uRange:'1',lRange:'10'},
    {viewValue:'11-20',uRange:'11',lRange:'20'},
    {viewValue:'21-30',uRange:'21',lRange:'30'},
    {viewValue:'31-35',uRange:'31',lRange:'35'},
  ]
  range

  selectedYear;
  selectedSemester;
  selectedSlot;
  comparisonList=[]
  // Pagination
  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 24;
  totalProductsStore = 0;

  // Query
  query: any = null;

  // Select View Child
  @ViewChild('matSchoolSelect') matCatSelect: MatSelect;
  @ViewChild('matSchoolSelect') matCat1Select: MatSelect;
  @ViewChild('matSemesterSelect') matSubCatSelect: MatSelect;

  // DOWNLOADABLE
  dataTypeFormat = 'excel';

  // Store Product

  product: any = null; //school

  public lineChartType: ChartType = 'bar';
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = [
    'cse101',
    'cse203',
    'cse104',
    'cse301',
    'cse223',
    'cse230',
    'cse330',
    'cse150',
  ];

  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [4, 6, 12, 3, 7, 5, 2, 5], label: 'Sections' },
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];

  constructor(
    private revinewService: RevinewService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private schoolService: SchoolService,
    private dialog: MatDialog,
    private reloadService: ReloadService,
    private uiService: UiService,
    private utilsService: UtilsService,
    private sectionService:SectionService,
  ) {}

  ngOnInit(): void {
    // GET PAGE FROM QUERY PARAM
    this.subAcRoute = this.activatedRoute.queryParams.subscribe((qParam) => {
      if (qParam && qParam.page) {
        this.currentPage = qParam.page;
      } else {
        this.currentPage = 1;
      }
    });

    // OBSERVABLE
    // this.reloadService.refreshRevinew$
    // .subscribe(() => {
    // this.getRevinew();
    // });

    // GET
    // this.getAllSchools();
  }

  onSubmit(){
    console.log(this.selectedSemester)
    console.log(this.selectedYear)
    console.log(this.selectedSlot)
    console.log(this.range)
    const data={
      semseter:this.selectedSemester,
      year:this.selectedYear,
      slot:this.selectedSlot,
      urange:this.range.uRange,
      lrange:this.range.lRange,
      
    }
    this.sectionService.getSectionWiseComparison(data)
    .subscribe(res=>{
      console.log(res.data);
      this.comparisonList=res.data;
    })
    
  }
  /**
   * COMPONENT DIALOG VIEW
   */
  // public openConfirmDialog(id: any) {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     maxWidth: '400px',
  //     data: {
  //       title: 'Confirm Delete',
  //       message: 'Are you sure you want delete this product?'
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     if (dialogResult) {
  //       this.deleteProductById(id);
  //     }
  //   });
  // }

  /**
   * HTTP REQ
   */

  

  /**
   * PAGINATION CHANGE
   */
  public onPageChanged(event: any) {
    this.router.navigate([], { queryParams: { page: event } });
  }

  /**
   * SELECTION CHANGE
   * FILTER
   */
   onSelectYear(data) {
   console.log(data);
   this.selectedYear=data;
  }

  onSelectSemesters(data) {
    console.log(data);
    this.selectedSemester=data;
  }

  onSelectSlot(data) {
    console.log(data);
    this.selectedSlot=data;
  }
  onSelectRange(data){
    console.log(data);
    this.range=data;
  }

  /**
   * ON REMOVE
   */
  onClearFilter() {
    this.matCatSelect.options.forEach((data: MatOption) => data.deselect());
    this.matSubCatSelect.options.forEach((data: MatOption) => data.deselect());
    this.query = null;
    this.router.navigate([], {
      queryParams: { page: null },
      queryParamsHandling: 'merge',
    });
   
  }

  /**
   * HTTP REQ HANDLE
   */

  /**
   * ON DESTROY
   */
  ngOnDestroy() {
    if (this.subAcRoute) {
      this.subAcRoute.unsubscribe();
    }
    if (this.subProduct) {
      this.subProduct.unsubscribe();
    }
    if (this.subCat) {
      this.subCat.unsubscribe();
    }
    if (this.subSubCat) {
      this.subSubCat.unsubscribe();
    }
    if (this.subForm) {
      this.subForm.unsubscribe();
    }
  }
}
