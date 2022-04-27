import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { DepartmentService } from 'src/app/services/department.service';
import { ReloadService } from 'src/app/services/reload.service';
import { RevinewService } from 'src/app/services/revinew.service';
import { SchoolService } from 'src/app/services/school.service';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-section-analysis',
  templateUrl: './section-analysis.component.html',
  styleUrls: ['./section-analysis.component.scss'],
})
export class SectionAnalysisComponent implements OnInit {
  dataForm: FormGroup;
  // Subscriptions
  private subProduct: Subscription;
  private subCat: Subscription;
  private subSubCat: Subscription;
  private subAcRoute: Subscription;
  private subForm: Subscription;
  private subDataOne?: Subscription;

  yearSelector = YEARS;

  // Store Data
  sectionsList: any[] = []; //revinew
  private holdPrevData: any[] = [];
  schools: any[] = ['sets']; //school
 
  semesters: Select[] = [
    { value: 'Summer', viewValue: 'Summer' },
    { value: 'Autumn', viewValue: 'Autumn' },
    { value: 'Spring', viewValue: 'Spring' },
  ];
  sectionSize=[
    {viewValue:'1-10',uRange:'1',lRange:'10'},
    {viewValue:'11-20',uRange:'11',lRange:'20'},
    {viewValue:'21-30',uRange:'21',lRange:'30'},
    {viewValue:'31-35',uRange:'31',lRange:'35'},
  ]

  // Pagination
  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 24;
  totalProductsStore = 0;

  // Query
  query: any = null;

  // Select View Child
  @ViewChild('matSchoolSelect') matCatSelect: MatSelect;
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
    
  ];

  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'Sections' },
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
    private fb: FormBuilder,
    private departmentService:DepartmentService,
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
    this.initFormValue();
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
  initFormValue() {
    this.dataForm = this.fb.group({
      year: [null],
      semester: [null],
     sectionSize: [null],
      
    });
  }
  onSubmitQuery(){
   
    console.log(this.dataForm.value)
    const data={
      year:this.dataForm.value.year,
      semester:this.dataForm.value.semester,
      urange:this.dataForm.value.sectionSize.uRange,
      lrange:this.dataForm.value.sectionSize.lRange,
      
    }
    this.departmentService.getSectionByCapacity(data)
    .subscribe(res=>{
      this.barChartData[0].data=[]
      this.barChartLabels=[]
      console.log(res.data)
      this.sectionsList=res.data;
      res.data.forEach(element => {
        
        this.barChartData[0].data.push(element.summary)
        this.barChartLabels.push(element.DEPARTMENT_ID)
      });
      console.log(this.barChartData)
    })

  }
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
   * ON REMOVE
   */
  onClearFilter() {
   this.dataForm.reset();
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
