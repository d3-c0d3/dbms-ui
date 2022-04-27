import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { YEARS } from 'src/app/core/utils/date-data';
import { Select } from 'src/app/interfaces/select';
import { ReloadService } from 'src/app/services/reload.service';
import { RevinewService } from 'src/app/services/revinew.service';
import { SchoolService } from 'src/app/services/school.service';
import { SectionService } from 'src/app/services/section.service';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-revinew',
  templateUrl: './revinew.component.html',
  styleUrls: ['./revinew.component.scss'],
})
export class RevinewComponent implements OnInit {
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
  revinew: any[] = []; //revinew
  private holdPrevData: any[] = [];

  schools: any[]; //school
  years = YEARS; //semester
  semesters: Select[] = [
    { value: 'summer', viewValue: 'Summer' },
    { value: 'autumn', viewValue: 'Autumn' },
    { value: 'spring', viewValue: 'Spring' },
  ];

  // Pagination
  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 24;
  totalProductsStore = 0;

  // Query
  query: any = null;

  // Select View Child
  @ViewChild('matSchoolSelect') matSchoolSelect: MatSelect;
  @ViewChild('matSemesterSelect') matSemesterSelect: MatSelect;
  @ViewChild('matYearSelect') matYearSelect: MatSelect;

  // DOWNLOADABLE
  dataTypeFormat = 'excel';

  // Store Product

  revinewList: any[] = []; //school

  
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
    private sectionService: SectionService
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
    this.getAllSchools();
    this.initFormValue();
  }

  initFormValue() {
    this.dataForm = this.fb.group({
      school: [null],
      startingSemester: [null],
      endingSemester: [null],
      startingYear: [null],
      endingYear: [null],
    });
  }

  onSubmitQuery() {
    this.barChartData=[
      { data: [], label: 'Sections' },
    ]
    this.revinewList=[];
    // console.log(this.barChartData[0]);
    // console.log(this.dataForm.value);
    let flag = this.dataForm.value.startingSemester;
    let semester = '';
    for (
      let index = this.dataForm.value.startingYear;
      index <= this.dataForm.value.endingYear;
      index++
    ) {
      if(parseInt(index)===this.dataForm.value.endingYear-1){
        console.log(this.barChartData)
        console.log(this.barChartLabels)
      }
      let sIndex = 0;
      const school = this.dataForm.value.school;
      const year = index;
      if (flag === 'summer') {
        let query1 = {
          school: school,
          year: year,
          semester: 'Summer',
        };
        this.sectionService.getFilturedRevinew(query1).subscribe((res) => {
          // console.log(res.data[0].data);
          this.barChartData[0].data.push(res.data[0].data)
          this.barChartLabels.push(query1.semester+query1.year)
          this.revinewList.push({ ...res.data, semester: 'Summer',year:year });
          
        });
        let query2 = {
          school: school,
          year: year,
          semester: 'Autumn',
        };
        this.sectionService.getFilturedRevinew(query2).subscribe((res) => {
          // console.log(res.data[0].data);
          this.barChartData[0].data.push(res.data[0].data)
          this.barChartLabels.push(query2.semester+query2.year)
          this.revinewList.push({ ...res.data, semester: 'Autumn',year:year });
          
        });
        let query3 = {
          school: school,
          year: year,
          semester: 'Spring',
        };
        this.sectionService.getFilturedRevinew(query3).subscribe((res) => {
          // console.log(res.data[0].data);
          // this.barChartData[0].data.pures.data[0].data          this.barChartLabels.push(query3.semester+query3.year)
          this.revinewList.push({ ...res.data, semester: 'Spring',year:year });
          
        });
      } else if (flag === 'autumn') {
        let query1 = {
          school: school,
          year: year,
          semester: 'Autumn',
        };
        this.sectionService.getFilturedRevinew(query1).subscribe((res) => {
          // console.log(res.data[0].data);
          this.barChartData[0].data.push(res.data[0].data)
          this.barChartLabels.push(query1.semester+query1.year)
          this.revinewList.push({ ...res.data, semester: 'Autumn',year:year });
          
        });
        let query2 = {
          school: school,
          year: year,
          semester: 'Spring',
        };
        this.sectionService.getFilturedRevinew(query2).subscribe((res) => {
          // console.log(res.data[0].data);
          this.barChartData[0].data.push(res.data[0].data)
          this.barChartLabels.push(query2.semester+query2.year)
          this.revinewList.push({ ...res.data, semester: 'Spring',year:year });
          
        });
        let query3 = {
          school: school,
          year: year,
          semester: 'Summer',
        };
        this.sectionService.getFilturedRevinew(query3).subscribe((res) => {
          // console.log(res.data[0].data);
          this.barChartData[0].data.push(res.data[0].data)
          this.barChartLabels.push(query3.semester+query3.year)
          this.revinewList.push({ ...res.data, semester: 'Summer',year:year });
          
        });
      } else {
        let query2 = {
          school: school,
          year: year,
          semester: 'Spring',
        };
        this.sectionService.getFilturedRevinew(query2).subscribe((res) => {
          // console.log(res.data[0].data);
          this.barChartData[0].data.push(res.data[0].data)
          this.barChartLabels.push(query1.semester+query1.year)
          this.revinewList.push({ ...res.data, semester: 'Spring',year:year });
          
        });
        let query3 = {
          school: school,
          year: year,
          semester: 'Summer',
        };
        this.sectionService.getFilturedRevinew(query3).subscribe((res) => {
          // console.log(res.data[0].data);
          this.barChartData[0].data.push(res.data[0].data)
          this.barChartLabels.push(query2.semester+query2.year)
          this.revinewList.push({ ...res.data, semester: 'Summer',year:year });
          
        });
        let query1 = {
          school: school,
          year: year,
          semester: 'Autumn',
        };
        this.sectionService.getFilturedRevinew(query1).subscribe((res) => {
          // console.log(res.data[0].data);
          this.barChartData[0].data.push(res.data[0].data)
          this.barChartLabels.push(query3.semester+query3.year)
          this.revinewList.push({ ...res.data, semester: 'Autumn',year:year });
          
        });
      }
      // console.log(this.revinewList);
      
      // this.sectionService.getFilturedRevinew()
    }
    
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

  private getAllSchools() {
    this.schoolService.getAllSchools().subscribe((res) => {
      // console.log(res.data);
      this.schools = res.data;
    });
  }

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

  /**
   * ON REMOVE
   */
  onClearFilter() {
    this.dataForm.reset();
    this.revinewList=[]
    // this.getAllProducts();
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
