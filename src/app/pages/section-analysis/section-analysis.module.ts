import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material/material.module';
import { SectionAnalysisRoutingModule } from './section-analysis-routing.module';
import { SectionAnalysisComponent } from './section-analysis.component';

@NgModule({
  declarations: [SectionAnalysisComponent],
  imports: [
    CommonModule,
    SectionAnalysisRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgxPaginationModule,
    FormsModule,
    NgxSpinnerModule,
    NgChartsModule,
    ReactiveFormsModule,
  ],
})
export class SectionAnalysisModule {}
