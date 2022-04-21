import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarNotificationComponent } from './ui/snackbar-notification/snackbar-notification.component';
import { BottomSheetViewComponent } from './ui/bottom-sheet-view/bottom-sheet-view.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    SnackbarNotificationComponent,
    BottomSheetViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    NgxSpinnerModule,
  ],
  exports:[
    SnackbarNotificationComponent,
    BottomSheetViewComponent
  ]
})
export class SharedModule { }
