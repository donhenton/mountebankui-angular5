import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPageComponent } from './json-page.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { ImpostersService } from '../../services/imposters.service';
import { MountebankService } from '../../services/mountebank.service';
import { LocalStorageModule } from '../../modules/local-storage/local-storage.module';
// https://blog.jdonado.com/unit-testing-in-angular-2/
import {
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions,
  RequestMethod,
  XHRBackend
} from '@angular/http';
import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';



describe('JsonPageComponent', () => {
  let component: JsonPageComponent;
  let fixture: ComponentFixture<JsonPageComponent>;
  let backend: MockBackend;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JsonPageComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        LocalStorageModule
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },


        LocalStorageService, ImpostersService, MountebankService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    inject([MockBackend],
      (_mockBackend) => {
        backend = _mockBackend;
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
