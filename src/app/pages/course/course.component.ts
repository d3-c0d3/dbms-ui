import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
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
import { CourseService } from 'src/app/services/course.service';
import { ReloadService } from 'src/app/services/reload.service';
import { RevinewService } from 'src/app/services/revinew.service';
import { SchoolService } from 'src/app/services/school.service';
import { SectionService } from 'src/app/services/section.service';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit {
  course = new FormControl();
  // courses: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
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
    { value: 'summer', viewValue: 'Summer' },
    { value: 'autumn', viewValue: 'Autumn' },
    { value: 'spring', viewValue: 'Spring' },
  ];
  //selected course
  selectedTerm: NgModel;
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
  // @ViewChild('range') matSubCatSelect: MatSelect;
  range
  selectedYear
  selectedSemester
  // DOWNLOADABLE
  dataTypeFormat = 'excel';

  // Store Product

  product: any = null; //school

  //chart
  public lineChartType: ChartType = 'doughnut';
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = [
    
  ];
  public barChartType = 'Doughnut';
  public barChartLegend = true;
  public barChartData = [
    { data: [], label: 'Sections' },
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
  ];
  courses: string[] = this.barChartLabels;
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
    private sectionService: SectionService,
    private courseService:CourseService,
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

    this.getAllCourseBySemester();
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
  //
  onSubmit(){
    this.barChartData=[
      { data: [], label: 'Sections' },
    ]
    console.log(this.range)
    console.log(this.selectedSemester)
    console.log(this.selectedYear)
const data={
  year:this.selectedYear,
  semester:this.selectedSemester,
  range:this.range,
}
    this.courseService.getCourseEnrollmentData(data)
    .subscribe(res=>{
      this.barChartData[0].data=[]
      this.barChartLabels=[]
      console.log(res.data)
      // this.sectionsList=res.data;
      res.data.forEach(element => {
        
        this.barChartData[0].data.push(element.t)
        this.barChartLabels.push(element.SCHOOL_ID)
      });
      console.log(this.barChartData)
    })
    
  }
  private getAllCourseBySemester() {
    const data = {
      year: 'year',
      semester: 'semester',
    };
    this.sectionService
      .getAllSectionByYearAndSemester(data)
      .subscribe((res) => {
        console.log(res);
      });
  }
  

  /**
   * PAGINATION CHANGE
   */
  public onPageChanged(event: any) {
    this.router.navigate([], { queryParams: { page: event } });
  }

  onSaveData() {
    console.log(this.selectedTerm);
  }
  /**
   * SELECTION CHANGE
   * FILTER
   */
  onSelectYear(data) {
      this.selectedYear=data;
  }

  onSelectSemesters(data) {
   this.selectedSemester=data;
  }

  onSelectRange(data) {
   
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
