import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material/material.module';
import { DepartmentWiseComparisonRoutingModule } from './department-wise-comparison-routing.module';
import { DepartmentWiseComparisonComponent } from './department-wise-comparison.component';

@NgModule({
  declarations: [DepartmentWiseComparisonComponent],
  imports: [
    CommonModule,
    DepartmentWiseComparisonRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgxPaginationModule,

    FormsModule,
    NgxSpinnerModule,
  ],
})
export class DepartmentWiseComparisonModule {}
