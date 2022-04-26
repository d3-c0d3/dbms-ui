import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevinewRoutingModule } from './revinew-routing.module';
import { RevinewComponent } from './revinew.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    RevinewComponent
  ],
  imports: [
    CommonModule,
    RevinewRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
  ]
})
export class RevinewModule { }
