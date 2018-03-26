import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecorateHelpComponent } from './decorate-help.component';

describe('DecorateHelpComponent', () => {
  let component: DecorateHelpComponent;
  let fixture: ComponentFixture<DecorateHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecorateHelpComponent ]
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
