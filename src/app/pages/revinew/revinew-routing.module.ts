import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevinewComponent } from './revinew.component';

const routes: Routes = [
  {
    path:'',component:RevinewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevinewRoutingModule { }
