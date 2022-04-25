import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursePlanningRoutingModule } from './course-planning-routing.module';
import { CoursePlanningComponent } from './course-planning.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    CoursePlanningComponent
  ],
  imports: [
    CommonModule,
    CoursePlanningRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgxPaginationModule,
    FormsModule,
    NgxSpinnerModule,
    NgChartsModule,
    ReactiveFormsModule
  ]
})
export class CoursePlanningModule { }
