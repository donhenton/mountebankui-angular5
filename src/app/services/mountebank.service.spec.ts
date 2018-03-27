import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import {
  BaseRequestOptions,
  Http,
  Headers,
  Response,
  ResponseOptions,
  RequestMethod,
  XHRBackend,
  JSONPBackend
} from '@angular/http';
import {

  MockBackend,
  MockConnection
} from '@angular/http/testing';
import { MountebankService } from './mountebank.service';
import harness from './../../../testing/harness';

describe('MountebankService', () => {
  let serviceRef: MountebankService;
  let backendRef: MockBackend;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [

        MockBackend,
        MountebankService,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }]
    });

    backendRef = TestBed.get(MockBackend);
    serviceRef = TestBed.get(MountebankService);

  });


  it('should be created', inject([MockBackend, MountebankService], (backend: MockBackend, service: MountebankService) => {
    expect(service).toBeTruthy();
    expect(backend).toBeTruthy();
  }));

  it('Imposter Collection Goldfile Comparison', inject([MockBackend, MountebankService],
    (backend: MockBackend, service: MountebankService) => {

      const input = harness.getHarness().imposterCollection[0];
      const expectedOutput = harness.stringify(harness.getHarness().expected[0]);
      const actualOutput = service.translate(input);
      const dist = harness.getEditDistance(expectedOutput, actualOutput);
      expect(dist).toEqual(1);

    }));

  it('useCORs should should not create OPTION', inject([MockBackend, MountebankService],
    (backend: MockBackend, service: MountebankService) => {
      const tt = service.translate(harness.getHarness().imposterCollection[0]);
      expect(tt.indexOf('OPTION') < 0);

    }));

  it('useCORs should should  create OPTION', inject([MockBackend, MountebankService],
    (backend: MockBackend, service: MountebankService) => {


      let input = harness.getHarness().imposterCollection[0];
      input = JSON.parse(JSON.stringify(input));
      input.useCORs = true;
      const tt = service.translate(input);
      expect(tt.indexOf('OPTION') > -1);

    }));

  it('Inject Comparison', inject([MockBackend, MountebankService],
    (backend: MockBackend, service: MountebankService) => {
      const input = harness.getHarness().imposterCollection[1];
      const expectedOutput = harness.stringify(harness.getHarness().expected[1]);
      const actualOutput = service.translate(input);
      const dist = harness.getEditDistance(expectedOutput, actualOutput);
      expect(dist).toEqual(0);

    }));

  fit('should show a fake post to mountebank', fakeAsync(() => {
    const response = {success: true};
    const  hh = new Headers();
    hh.append('fred', 'ted');
    backendRef.connections.subscribe(connection => {
      connection.mockRespond(new Response(<ResponseOptions>{
        body: JSON.stringify(response),
        status: 200,
        headers: hh
      }));
    });

    const success =  (data) => {

     // console.log(data);
    };
    const err = (e) => {

    };


    serviceRef.postToMountebank('http://fred.com', {}).subscribe(success, err);



  }));





});
