import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImposterSelectorComponent } from './imposter-selector.component';

describe('ImposterSelectorComponent', () => {
  let component: ImposterSelectorComponent;
  let fixture: ComponentFixture<ImposterSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImposterSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImposterSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});