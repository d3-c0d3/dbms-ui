import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentWiseComparisonComponent } from './department-wise-comparison.component';

const routes: Routes = [
  {
    path:'',component:DepartmentWiseComparisonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentWiseComparisonRoutingModule { }
