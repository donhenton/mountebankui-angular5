import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectionHelpComponent } from './injection-help.component';

describe('InjectionHelpComponent', () => {
  let component: InjectionHelpComponent;
  let fixture: ComponentFixture<InjectionHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InjectionHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InjectionHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
