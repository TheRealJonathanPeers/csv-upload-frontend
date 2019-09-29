import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvOverviewComponent } from './csv-overview.component';

describe('CsvOverviewComponent', () => {
  let component: CsvOverviewComponent;
  let fixture: ComponentFixture<CsvOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
