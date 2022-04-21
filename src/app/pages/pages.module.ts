import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '../core/components/header/header.component';
import { SidenavListComponent } from '../core/components/sidenav-list/sidenav-list.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
// import { SextionComponent } from './sextion/sextion.component';


@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    SidenavListComponent,
    // SextionComponent,
    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ]
})
export class PagesModule { }
