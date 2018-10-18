# ngx-wdussr-grid
Route-able angular grid

*Why don't use server side rendering*

## Function
- Simple and independence
- Routing-able, history navigation support
- Only support remote data
- New metadata only

## Usage
`npm i ngx-wdussr-grid`

### Template (.html)

``` html
<ng-grid [options]="options" [cols]="cols" [api]="api"></ng-grid>
```

### Component (.ts)

``` ts
import { Component, OnInit } from '@angular/core';
import { GridFilter, GridOptions, Col, GridResult } from 'ngx-wdussr-grid';

@Component({
  selector: 'test-component',
  templateUrl: './test.component.html',
})
export class TestComponent implements OnInit {

  options: GridOptions = {
    filtering: true,
    enableNumber: true
  }

  cols: Col[] = [
    { prop: 'no', title: 'No.', width: 5, filtering: false, sorting: false },
    {
      prop: 'name', title: 'Name', cellTemplate: (item) => `${item.name} - ${item.age}`,
    },
    { prop: 'age', title: 'Age' },
    { prop: 'address', title: 'Address' }
  ]

  api = (filter: GridFilter) => {
    // replace by your API
    return Promise.resolve(<GridResult<any>>{
      data: [
        { name: 'John', age: 24, address: 'Machester' },
        { name: 'Derry', age: 52, address: 'London' }
      ],
      itemsCount: 12
    });
  }

  ngOnInit(): void {

  }
}

```
 ## Interface
 ### Column definition
 ``` ts
 export interface Col {
    prop: string;
    title: string;
    filtering?: boolean;
    sorting?: boolean;
    width?: number;
    alight?: 'left' | 'center' | 'right';
    cellTemplate?: (item: any) => HTMLElement | string;
    filteringSelect?: { val: any, text: string }[];
}
 ```

 ### Filtering
 ``` ts
 export interface GridFilter {
    pageIndex: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: 'asc' | 'desc',
    search?: { [k: string]: string; }
}
 ```

 ### Result
 ``` ts
 export interface GridResult<T> {
    data: Array<T | any>;
    itemsCount: number;
}
 ```

 ### Options
 ``` ts
 export interface GridOptions {
    filtering?: boolean;
    inserting?: boolean;
    editing?: boolean;
    selecting?: boolean;
    sorting?: boolean;
    paging?: boolean;
    delay?: number;
    refresh?: boolean;
    enableNumber?: boolean;
}
 ```


