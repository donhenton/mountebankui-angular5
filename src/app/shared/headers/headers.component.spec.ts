import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeadersComponent } from './headers.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImpostersService } from '../../services/imposters.service';
import { LocalStorageModule } from '../../modules/local-storage/local-storage.module';
import { LocalStorageService } from '../../services/local-storage.service';

describe('HeadersComponent', () => {
  let component: HeadersComponent;
  let fixture: ComponentFixture<HeadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        LocalStorageModule,
      ],
      declarations: [ HeadersComponent ],
      providers: [ImpostersService, LocalStorageService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
