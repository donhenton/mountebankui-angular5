import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonPageComponent } from './json-page.component';

describe('JsonPageComponent', () => {
  let component: JsonPageComponent;
  let fixture: ComponentFixture<JsonPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
