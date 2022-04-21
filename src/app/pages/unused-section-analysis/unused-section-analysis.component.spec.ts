import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnusedSectionAnalysisComponent } from './unused-section-analysis.component';

describe('UnusedSectionAnalysisComponent', () => {
  let component: UnusedSectionAnalysisComponent;
  let fixture: ComponentFixture<UnusedSectionAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnusedSectionAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnusedSectionAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
