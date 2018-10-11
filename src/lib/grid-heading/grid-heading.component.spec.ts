import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHeadingComponent } from './grid-heading.component';

describe('GridHeadingComponent', () => {
  let component: GridHeadingComponent;
  let fixture: ComponentFixture<GridHeadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridHeadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridHeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
