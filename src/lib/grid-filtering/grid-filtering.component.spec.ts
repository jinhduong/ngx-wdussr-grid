import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridFilteringComponent } from './grid-filtering.component';

describe('GridFilteringComponent', () => {
  let component: GridFilteringComponent;
  let fixture: ComponentFixture<GridFilteringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridFilteringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
