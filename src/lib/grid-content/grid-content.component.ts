import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { GridResult } from '../core/Result';
import { Col } from '../core/Col';

@Component({
  selector: '[ng-grid-content]',
  templateUrl: './grid-content.component.html',
  styleUrls: ['./grid-content.component.scss']
})
export class GridContentComponent<T> implements OnInit {

  @Input() data : GridResult<T>;
  @Input() cols: Col[];

  constructor() {}

  ngOnInit() {}

  /**
   *
   * Generate cell template
   */
  genUI(td: any, d: T, c: Col) {
    if (c.cellTemplate) {
      const ui = c.cellTemplate(d);
      if (ui instanceof HTMLElement) {
        td.innerHTML = '';
        td.append(ui);
      }
      return ui;
    }
    return d[c.prop];
  }
}
