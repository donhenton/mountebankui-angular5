import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { LocalStorageModule } from '../modules/local-storage/local-storage.module';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
      imports: [

        LocalStorageModule

      ],
    });
  });

  it('should be created', inject([LocalStorageService], (service: LocalStorageService) => {
    expect(service).toBeTruthy();
  }));

  it('should be able to get and recieve', inject([LocalStorageService], (service: LocalStorageService) => {
     service.set('bonzo', {results: 'get a job'});
     const t = service.get('bonzo');
     expect(t.results).toEqual('get a job');
  }));



});
