import { TestBed, inject } from '@angular/core/testing';
import { LocalStorageModule } from '../modules/local-storage/local-storage.module';
import { ImpostersService } from './imposters.service';
import { LocalStorageService } from './local-storage.service';

let lsService: LocalStorageService;

describe('ImpostersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImpostersService, LocalStorageService],
      imports: [

        LocalStorageModule

      ],
    });
    lsService = TestBed.get(LocalStorageService);
    lsService.clear();
  });

  it('should be created and initialized with default collection', inject([ImpostersService], (service: ImpostersService) => {
    expect(service).toBeTruthy();
    expect(lsService).not.toBeNull();
    const tt = lsService.get(ImpostersService.LS_KEY);
    expect(tt).not.toBeNull();


  }));




});
