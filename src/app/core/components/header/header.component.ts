import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/admin';
import { AdminService } from 'src/app/services/admin.service';
// import {AdminService} from '../../../../services/admin.service';
// import {Admin} from '../../../../interfaces/admin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavNavToggle = new EventEmitter();

  adminData: Admin = null;

  constructor(
    private adminService: AdminService,
    private router:Router,
  ) {
  }

  ngOnInit() {
    this.getUserData();
  }


  onToggleSidenav() {
    console.log('here')
    this.sidenavNavToggle.emit();
  }

  adminLogOut() {
    this.adminService.adminLogOut();
  }
  navigateToRoute(link){
    this.router.navigate([`/${link}`])
  }
  /**
   * HTTP Requested Data
   */
  private getUserData() {
    this.adminData=null;
    /* this.adminService.getAdminShortData()
      .subscribe(res => {
        this.adminData = res.data;
      }); */
  }
}
