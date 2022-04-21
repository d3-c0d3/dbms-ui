import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentWiseComparisonRoutingModule } from './department-wise-comparison-routing.module';
import { DepartmentWiseComparisonComponent } from './department-wise-comparison.component';


@NgModule({
  declarations: [
    DepartmentWiseComparisonComponent
  ],
  imports: [
    CommonModule,
    DepartmentWiseComparisonRoutingModule
  ]
})
export class DepartmentWiseComparisonModule { }
