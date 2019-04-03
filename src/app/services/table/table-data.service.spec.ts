import { TestBed } from '@angular/core/testing';

import { TableDataService } from './table-data.service';
import { MockTableDataService } from '../../../test/mock-table-data-service';

describe('TableDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      providers: [
        { provide: TableDataService, useClass: MockTableDataService }
      ]
  }));

  it('should be created', () => {
    const service: TableDataService = TestBed.get(TableDataService);
    expect(service).toBeTruthy();
  });
});
