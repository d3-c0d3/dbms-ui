import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionAnalysisComponent } from './section-analysis.component';

const routes: Routes = [
  {
    path:'',component:SectionAnalysisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionAnalysisRoutingModule { }
