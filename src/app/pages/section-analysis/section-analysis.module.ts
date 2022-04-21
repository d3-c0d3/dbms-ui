import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionAnalysisRoutingModule } from './section-analysis-routing.module';
import { SectionAnalysisComponent } from './section-analysis.component';


@NgModule({
  declarations: [
    SectionAnalysisComponent
  ],
  imports: [
    CommonModule,
    SectionAnalysisRoutingModule
  ]
})
export class SectionAnalysisModule { }
