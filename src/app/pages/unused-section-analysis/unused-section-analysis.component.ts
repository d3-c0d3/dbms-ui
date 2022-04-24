import { Component, OnInit, ViewChild } from '@angular/core';
import { MatOption, MatOptionSelectionChange } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { Pagination } from 'src/app/interfaces/pagination';
import { Select } from 'src/app/interfaces/select';
import { ReloadService } from 'src/app/services/reload.service';
import { RevinewService } from 'src/app/services/revinew.service';
import { SchoolService } from 'src/app/services/school.service';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-unused-section-analysis',
  templateUrl: './unused-section-analysis.component.html',
  styleUrls: ['./unused-section-analysis.component.scss'],
})
export class UnusedSectionAnalysisComponent implements OnInit {
  // Subscriptions
  private subProduct: Subscription;
  private subCat: Subscription;
  private subSubCat: Subscription;
  private subAcRoute: Subscription;
  private subForm: Subscription;
  private subDataOne?: Subscription;

  // Store Data
  revinew: any[] = []; //revinew
  private holdPrevData: any[] = [];
  schools: any[] = ['sets']; //school
  semesters: any[] = []; //semester
  stockTypes: Select[] = [
    { value: { quantity: { $gt: 0 } }, viewValue: 'Summer' },
    { value: { quantity: { $lte: 0 } }, viewValue: 'Autumn' },
    { value: { quantity: { $lte: 0 } }, viewValue: 'Spring' },
  ];

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

  constructor(
    private revinewService: RevinewService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private schoolService: SchoolService,
    private dialog: MatDialog,
    private reloadService: ReloadService,
    private uiService: UiService,
    private utilsService: UtilsService
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

  private getAllProducts() {
    this.spinner.show();

    const pagination: Pagination = {
      pageSize: this.productsPerPage.toString(),
      currentPage: this.currentPage.toString(),
    };

    const sort = { createdAt: -1 };
  }

  private getAllCategory() {}

  private getAllSubCategory(categoryId: string) {}

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
  onSelectSchool(event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      const category = event.source.value;
      this.query = { category: category._id };
      this.getAllSubCategory(category._id);
      if (this.currentPage > 1) {
        this.router.navigate([], { queryParams: { page: 1 } });
      } else {
        this.getAllProducts();
      }
    }
  }

  onSelectSemesters(event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      const subCategory = event.source.value; //as DataType
      this.query = { ...this.query, ...{ subCategory: subCategory._id } };
      if (this.currentPage > 1) {
        this.router.navigate([], { queryParams: { page: 1 } });
      } else {
        this.getAllProducts();
      }
    }
  }

  onSelectStockType(event: MatOptionSelectionChange) {
    if (event.isUserInput) {
      this.query = event.source.value;
      if (this.currentPage > 1) {
        this.router.navigate([], { queryParams: { page: 1 } });
      } else {
        this.getAllProducts();
      }
    }
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
    this.getAllProducts();
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
