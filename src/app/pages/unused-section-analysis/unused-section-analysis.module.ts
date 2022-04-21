import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnusedSectionAnalysisRoutingModule } from './unused-section-analysis-routing.module';
import { UnusedSectionAnalysisComponent } from './unused-section-analysis.component';


@NgModule({
  declarations: [
    UnusedSectionAnalysisComponent
  ],
  imports: [
    CommonModule,
    UnusedSectionAnalysisRoutingModule
  ]
})
export class UnusedSectionAnalysisModule { }
