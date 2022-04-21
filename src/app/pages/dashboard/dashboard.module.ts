
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule, Routes} from '@angular/router';

// import {FlexLayoutModule} from '@angular/flex-layout';
import {BarChartModule, LineChartModule} from '@swimlane/ngx-charts';
import {TilesComponent} from './tiles/tiles.component';
// import {FlexLayoutServerModule} from '@angular/flex-layout/server';
import {InfoCardsComponent} from './info-cards/info-cards.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlexLayoutModule } from '@angular/flex-layout';


const routes: Routes = [
  {path: '', component: DashboardComponent},
];


@NgModule({
  declarations: [
    DashboardComponent,
    TilesComponent,
    InfoCardsComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FlexLayoutModule,
    // FlexLayoutServerModule,
    LineChartModule,
    BarChartModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule
  ]
})
export class DashboardModule {
}
