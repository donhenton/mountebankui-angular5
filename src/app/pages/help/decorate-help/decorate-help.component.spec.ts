import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertModule, TooltipModule, TabsModule, AccordionModule, SortableModule, ModalModule, BsModalRef } from 'ngx-bootstrap';
import { DecorateHelpComponent } from './decorate-help.component';

describe('DecorateHelpComponent', () => {
  let component: DecorateHelpComponent;
  let fixture: ComponentFixture<DecorateHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecorateHelpComponent ],
      imports: [

        ModalModule.forRoot()
    ],
    providers: [BsModalRef],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecorateHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
