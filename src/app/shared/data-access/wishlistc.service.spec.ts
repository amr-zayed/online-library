import { TestBed } from '@angular/core/testing';

import { WishlistcService } from './wishlistc.service';

describe('WishlistcService', () => {
  let service: WishlistcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
