import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Col } from '../core/Col';
import { GridOptions } from '../core/Options';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GridFilter } from '../core';

@Component({
  selector: '[ng-grid-filtering]',
  templateUrl: './grid-filtering.component.html',
  styleUrls: ['./grid-filtering.component.css']
})
export class GridFilteringComponent implements OnInit {

  subject: Subject<Object> = new Subject();

  @Input() options: GridOptions;
  @Input() cols: Col[];
  @Input() filter: GridFilter;

  @Output() filterer = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.subject.pipe(
      debounceTime(this.options.delay)
    ).subscribe(filterData => this.handleFilter(filterData));
  }


  /**
   *
   * Set default value for filtering control
   * Fired only first time
   */
  setDefault(c: Col) {
    let value = null;
    if (this.filter.search) {
      value = this.filter.search[c.prop] || null;
    }
    return value;
  }

  /**
   *
   * Handle after done a filtering
   */
  handleFilter(filterData: Object): void {
    this.filterer.emit(filterData as any);
  }

  /**
   *
   * Fired once user filtered data from input control
   */
  onFiltering(e: any, c: Col) {
    const filterObj = {
      [c.prop]: e.target.value
    };
    this.subject.next(filterObj);
  }


  /**
   *
   * Fired once user filtered data from select control
   */
  onSelectFiltering(e: any, c: Col) {
    const filterObj = {
      [c.prop]: e.target.value
    };
    this.subject.next(filterObj);
  }
}
