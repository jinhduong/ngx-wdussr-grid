import { NgModule } from '@angular/core';
import { GridComponent } from './grid/grid.component';
import { GridContentComponent } from './grid-content/grid-content.component';
import { CommonModule } from '@angular/common';
import { GridPagingComponent } from './grid-paging/grid-paging.component';
import { RouterModule } from '@angular/router';
import { GridFilteringComponent } from './grid-filtering/grid-filtering.component';
import { GridHeadingComponent } from './grid-heading/grid-heading.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [GridComponent, GridContentComponent, GridPagingComponent, GridFilteringComponent, GridHeadingComponent],
  exports: [GridComponent]
})
export class NgxWdussrGridModule { }
