import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material/material.module';
import { RevinewRoutingModule } from './revinew-routing.module';
import { RevinewComponent } from './revinew.component';

@NgModule({
  declarations: [RevinewComponent],
  imports: [
    CommonModule,
    RevinewRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgxPaginationModule,
    FormsModule,
    NgxSpinnerModule,
    NgChartsModule,
    ReactiveFormsModule,
  ],
})
export class RevinewModule {}
