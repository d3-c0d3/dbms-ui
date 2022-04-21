import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentWiseComparisonComponent } from './department-wise-comparison.component';

describe('DepartmentWiseComparisonComponent', () => {
  let component: DepartmentWiseComparisonComponent;
  let fixture: ComponentFixture<DepartmentWiseComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentWiseComparisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentWiseComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
