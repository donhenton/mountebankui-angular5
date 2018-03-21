import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImportPageComponent } from './import-page.component';
import { ImpostersService } from '../../services/imposters.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { LocalStorageModule } from '../../modules/local-storage/local-storage.module';

describe('ImportPageComponent', () => {
  let component: ImportPageComponent;
  let fixture: ComponentFixture<ImportPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        LocalStorageModule
      ],
      declarations: [ ImportPageComponent ],
      providers: [ImpostersService, LocalStorageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
