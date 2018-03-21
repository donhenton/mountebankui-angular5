import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ImpostersService } from '../../services/imposters.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { LocalStorageModule } from '../../modules/local-storage/local-storage.module';
import { SettingsPageComponent } from './settings-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SettingsPageComponent', () => {
  let component: SettingsPageComponent;
  let fixture: ComponentFixture<SettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        LocalStorageModule
      ],
      providers: [ImpostersService, LocalStorageService],
      declarations: [ SettingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
