import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SortableModule, BsModalRef  } from 'ngx-bootstrap';
import { SortDialogComponent } from './sort-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SortDialogComponent', () => {
  let component: SortDialogComponent;
  let fixture: ComponentFixture<SortDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SortableModule.forRoot()],
      declarations: [ SortDialogComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [BsModalRef]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});

