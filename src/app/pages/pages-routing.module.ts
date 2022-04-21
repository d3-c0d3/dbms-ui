import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'summary',
        loadChildren: () => import('./summary/summary.module').then(m => m.SummaryModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'section-analysis',
        loadChildren: () => import('./section-analysis/section-analysis.module').then(m => m.SectionAnalysisModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'revinew',
        loadChildren: () => import('./revinew/revinew.module').then(m => m.RevinewModule),
        data: {preload: true, delay: false}
      },
     
      {
        path: 'department-wise-comparison',
        loadChildren: () => import('./department-wise-comparison/department-wise-comparison.module').then(m => m.DepartmentWiseComparisonModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'unused-section-analysis',
        loadChildren: () => import('./unused-section-analysis/unused-section-analysis.module').then(m => m.UnusedSectionAnalysisModule),
        data: {preload: true, delay: false}
      },
      {
        path: 'course',
        loadChildren: () => import('./course/course.module').then(m => m.CourseModule),
        data: {preload: true, delay: false}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
