import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { menuItemsSuperAdmin } from '../core/utils/admin-menu';
import { MenuCtrService } from '../services/menu-ctr.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit,AfterViewInit {
  @Output() @ViewChild('sidenav', {static: true}) sidenav;
  @Input() isAdminMenu = false;
  @Input() sideNavMenuList: any[];
  menuList:any[]=[]
  constructor(
    private router:Router,
    private menuCtrService:MenuCtrService
  ) { }

  ngOnInit(): void {
    this.menuList = menuItemsSuperAdmin;
    console.log(this.menuList)
  }
  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (window.innerWidth <= 599) {
          this.sidenav.close();
        }
      }
    });
    this.menuCtrService.expandActiveSubMenuUser(this.menuList);
  }

}
