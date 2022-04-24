import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material/material.module';
import { UnusedSectionAnalysisRoutingModule } from './unused-section-analysis-routing.module';
import { UnusedSectionAnalysisComponent } from './unused-section-analysis.component';

@NgModule({
  declarations: [UnusedSectionAnalysisComponent],
  imports: [
    CommonModule,
    UnusedSectionAnalysisRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgxPaginationModule,
    FormsModule,
    NgxSpinnerModule,
  ],
})
export class UnusedSectionAnalysisModule {}
