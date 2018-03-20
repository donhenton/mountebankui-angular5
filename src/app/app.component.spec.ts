import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import routes from './../../testing/testRoutes';
import { HelpPageComponent } from './pages/help-page/help-page.component';
/**
 * more on router testing : https://codecraft.tv/courses/angular/unit-testing/routing/
 */


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, HelpPageComponent
      ],
      imports: [
        [RouterTestingModule.withRoutes(routes)]
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

});
