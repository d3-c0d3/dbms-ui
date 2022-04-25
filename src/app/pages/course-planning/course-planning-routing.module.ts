import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursePlanningComponent } from './course-planning.component';

const routes: Routes = [
  {
    path:'',component:CoursePlanningComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursePlanningRoutingModule { }
