import { TestBed, inject } from '@angular/core/testing';

import { NgxWdussrGridService } from './ngx-wdussr-grid.service';

describe('NgxWdussrGridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxWdussrGridService]
    });
  });

  it('should be created', inject([NgxWdussrGridService], (service: NgxWdussrGridService) => {
    expect(service).toBeTruthy();
  }));
});
