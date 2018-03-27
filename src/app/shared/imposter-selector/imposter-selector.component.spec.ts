import {  fakeAsync, getTestBed, inject, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImposterSelectorComponent } from './imposter-selector.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';

describe('ImposterSelectorComponent', () => {
  let component: ImposterSelectorComponent;
  let fixture: ComponentFixture<ImposterSelectorComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
/*
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ ImposterSelectorComponent ],
      providers: [ { provide: FormBuilder, useValue: formBuilder } ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImposterSelectorComponent);
    const formBuilder: FormBuilder = new FormBuilder();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
*/
beforeEach(async(() => {
  TestBed.configureTestingModule({
    declarations: [ ImposterSelectorComponent ],
    imports: [FormsModule, ReactiveFormsModule],
    providers: [ { provide: FormBuilder, useValue: formBuilder } ]
   // schemas: [NO_ERRORS_SCHEMA]
  })
  .compileComponents();
}));


beforeEach(() => {
  fixture = TestBed.createComponent(ImposterSelectorComponent);
  component = fixture.componentInstance;
  component.parentForm = formBuilder.group({bonzo: []});
  component.formControlName = 'bonzo';
  fixture.detectChanges();
});




  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// https://medium.com/@paynoattn/angular2-formbuilder-unit-tests-9da5ef5dbbe5

/*

This test errored out with no real message but  errorThrown

to see the error
    mark the it('test..) to fit('test...) to run a single test
    then ng test -sm=false --single-run false

    this test now passes because the control is expecting a form with a formControlName that it really can find

*/
