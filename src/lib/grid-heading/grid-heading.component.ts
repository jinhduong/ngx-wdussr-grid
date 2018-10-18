import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Col, GridFilter } from '../core';

@Component({
  selector: '[ng-grid-heading]',
  templateUrl: './grid-heading.component.html',
  styleUrls: ['./grid-heading.component.scss']
})
export class GridHeadingComponent implements OnInit {

  @Input() cols: Col[];
  @Input() filter: GridFilter;
  @Output() sorter = new EventEmitter();

  _sortField: string;
  _sortOrder: 'asc' | 'desc' = 'asc';

  constructor() { }

  ngOnInit() {
    this._sortField = this.filter.sortField;
    this._sortOrder = this.filter.sortOrder;
  }

  sort(c: Col) {

    if (c.sorting === false) return;

    if (c.prop === this._sortField) {
      this._sortOrder = this._sortOrder == 'asc' ? 'desc' : 'asc';
    } else {
      this._sortField = c.prop;
      this._sortOrder = 'asc';
    }

    this.sorter.emit({
      sortField: this._sortField,
      sortOrder: this._sortOrder
    })
  }

  classRender(c: Col) {
    if (c.prop === this._sortField) {
      return `sort ${this._sortOrder}`;
    }
  }

  styleRender(c: Col) {
    return {
      'width': c.width ? `${c.width}%` : null,
      'cursor': c.sorting !== false ? 'pointer' : null
    };
  }
}
