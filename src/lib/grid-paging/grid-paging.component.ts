import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridResult } from '../core';

@Component({
  selector: 'ng-grid-paging',
  templateUrl: './grid-paging.component.html',
  styleUrls: ['./grid-paging.component.scss']
})
export class GridPagingComponent<T> implements OnInit {

  // Store data from parent
  _data: GridResult<T>;

  // Page number
  _pageNum: number;

  // Currently page => start from 1
  _currentIndex: number = 1;

  // Page items
  _pageItems: { index: number, text: string }[];

  @Output() nav = new EventEmitter();

  @Input()
  set data(value: GridResult<T>) {
    this._data = value;
    this.render();
  }
  get data() {
    return this._data;
  }

  @Input()
  set currentIndex(i: number) {
    this._currentIndex = Number(i);
  }
  get currentIndex() {
    return this._currentIndex;
  }

  constructor(
  ) { }

  ngOnInit() {
  }

  render() {
    this._pageNum = Math.round(this.data.itemsCount / 10) + 1;
    this._pageItems = Array(this._pageNum)
      .fill(0)
      .map((x, i) => <{ index: number, text: string }>{
        index: i + 1,
        text: (i + 1).toString()
      });
  }

  navigate(p: { index: number, text: string }) {
    this._currentIndex = p.index;
    this.nav.emit(p as any);
  }

  previous() {
    if (this._currentIndex !== 1) {
      this._currentIndex--;
      this.nav.emit(this._pageItems[this._currentIndex - 1]);
    }
  }

  next() {
    if (this._currentIndex !== this._pageNum) {
      this.nav.emit(this._pageItems[this._currentIndex - 1 + 1]);
      this._currentIndex++;
    }
  }

  last() {
    if (this._currentIndex !== this._pageNum) {
      this.nav.emit(this._pageItems[this._pageNum - 1]);
      this._currentIndex = this._pageNum;
    }
  }
}
