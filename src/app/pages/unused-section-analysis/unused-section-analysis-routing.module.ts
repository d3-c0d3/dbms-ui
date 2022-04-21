import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnusedSectionAnalysisComponent } from './unused-section-analysis.component';

const routes: Routes = [
  {
    path:'',component:UnusedSectionAnalysisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnusedSectionAnalysisRoutingModule { }
