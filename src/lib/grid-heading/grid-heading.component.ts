import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Col } from '../core';

@Component({
  selector: '[ng-grid-heading]',
  templateUrl: './grid-heading.component.html',
  styleUrls: ['./grid-heading.component.scss']
})
export class GridHeadingComponent implements OnInit {

  @Input() cols: Col[];
  @Output() sorter = new EventEmitter();

  _sortField: string;
  _sortOther: 'asc' | 'desc' = 'asc';

  constructor() { }

  ngOnInit() {
  }

  sort(c: Col) {
    if (c.prop === this._sortField) {
      this._sortOther = this._sortOther == 'asc' ? 'desc' : 'asc';
    } else {
      this._sortField = c.prop;
      this._sortOther = 'asc';
    }

    this.sorter.emit({
      sortField: this._sortField,
      sortOther: this._sortOther
    })
  }

  classRender(c: Col) {
    if (c.prop === this._sortField) {
      return `sort ${this._sortOther}`;
    }
  }
}
