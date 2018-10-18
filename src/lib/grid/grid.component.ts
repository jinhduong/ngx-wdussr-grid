import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Col } from '../core/Col';
import { GridFilter } from '../core/Filter';
import { GridResult } from '../core/Result';
import { Router, NavigationEnd } from '@angular/router';
import { getQueries } from '../core/utils';
import { GridOptions } from '../core/Options';

@Component({
  selector: 'ng-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GridComponent<T> implements OnInit {
  _cols: Col[] = [];
  _options: GridOptions = {
    filtering: false,
    paging: true,
    delay: 300,
    refresh: true,
    enableNumber: false
  }
  _api: (filter: GridFilter) => Promise<GridResult<T>>;
  _promise: Promise<GridResult<T>>;
  _filter: GridFilter = {
    pageIndex: 1,
    pageSize: 10
  };
  _data: GridResult<T> = {
    data: [],
    itemsCount: 0
  }
  _initPageIndex: number;

  @Input()
  set cols(value: Col[]) {
    this._cols = value;
  };
  get cols() {
    return this._cols
  };

  @Input()
  set api(value: (filter: GridFilter) => Promise<GridResult<T>>) {
    this._api = value;
    this._callApi();
  }
  get api() {
    return this._api;
  }

  @Input()
  set options(value: GridOptions) {
    if (value)
      this._options = Object.assign(this._options, value);
  }
  get options() {
    return this._options;
  }

  constructor(
    private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(b => {
      if (b instanceof NavigationEnd) {
        this._callApi();
      }
    });

    let queries: GridFilter = getQueries();
    this._initPageIndex = queries !== null ? queries.pageIndex : 1;
  }

  /**
   * Fired once use nagivate to another page
   */
  navigate(p: { index: number, text: string }) {
    this._filter.pageIndex = p.index;
    this._gridNavigate();
  }

  /**
   *
   * Once user done filtering
   */
  doFiltering(filterData: any) {
    this._filter.search = Object.assign(this._filter.search || {}, filterData);
    this._gridNavigate();
  }

  doSorting(sortData: any) {
    this._filter = Object.assign(this._filter || {}, sortData);
    this._gridNavigate();
  }

  refresh() {
    this._callApi();
  }

  /**
  *
  * Navigate by filtering data
  */
  _gridNavigate() {
    const cloneFilter: any = JSON.parse(JSON.stringify(this._filter));
    cloneFilter.search = JSON.stringify(cloneFilter.search);
    this.router.navigate([location.pathname], {
      queryParams: cloneFilter
    });
  }

  /**
   * Core function to get data from promise
   * 1. Get filtering from url queries
   * 2a. If has filter data => call promise with this filtering
   * 2b. If hasn't filter data => Ignore and use default filter data
   */
  private _callApi() {
    console.log('api call');
    let queries: GridFilter = getQueries();
    if (queries) this._filter = queries;

    const cloneFilter: any = JSON.parse(JSON.stringify(this._filter));
    cloneFilter.search = JSON.stringify(cloneFilter.search);

    this._promise = this._api(cloneFilter);
    this._promise.then(rs => {
      if (this.options.enableNumber) this._data = this.transformNumbering(rs);
      else this._data = rs;
    });
  }

  private transformNumbering(rs: GridResult<T>) {
    let num = ((this._filter.pageIndex - 1) * this._filter.pageSize) + 1;
    rs.data = rs.data.map(x => {
      x.no = num++;
      return x;
    });
    return rs;
  }
}
