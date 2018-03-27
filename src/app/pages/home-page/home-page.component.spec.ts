import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImposterSelectorComponent } from '../../shared/imposter-selector/imposter-selector.component';
import { TooltipModule, TabsModule, ModalModule, AccordionModule, SortableModule } from 'ngx-bootstrap';
import { HeadersComponent } from '../../shared/headers/headers.component';
import { ImpostersService } from '../../services/imposters.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { LocalStorageModule } from '../../modules/local-storage/local-storage.module';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        LocalStorageModule,
        ReactiveFormsModule,
        TooltipModule.forRoot(),
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        AccordionModule.forRoot(),
        SortableModule.forRoot(),
      ],
      providers: [ImpostersService, LocalStorageService],
      declarations: [ HeadersComponent, HomePageComponent, ImposterSelectorComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
