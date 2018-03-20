import { TestBed, inject } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { LocalStorageModule } from '../modules/local-storage/local-storage.module';

const serviceRef = null;
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

  it('should be able to get and recieve and remove', inject([LocalStorageService], (service: LocalStorageService) => {
    service.set('bonzo', { results: 'get a job' });
    const t = service.get('bonzo');
    expect(t.results).toEqual('get a job');
    service.removeItem('bonzo');
  }));

  it('should be able to get and recieve with a prefix and removed', inject([LocalStorageService], (service: LocalStorageService) => {
    service.setPrefix('fred');
    service.set('bonzo', { results: 'get a job' });
    let t = service.get('bonzo');
    expect(t.results).toEqual('get a job');
    service.removeItem('bonzo');
    t = service.get('bonzo');
    expect(t).toBeNull();

  }));

  it('should clear', inject([LocalStorageService], (service: LocalStorageService) => {
    service.set('bonzo', { results: 'get a job' });
    service.clear();
    const t = service.get('bonzo');
    expect(t).toBeNull();

  }));


});
