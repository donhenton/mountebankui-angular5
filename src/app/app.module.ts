import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { JsonPageComponent } from './pages/json-page/json-page.component';
import { ImportPageComponent } from './pages/import-page/import-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

const appRoutes: Routes = [
  { path: 'help', component: HelpPageComponent },
  { path: 'import', component: ImportPageComponent },
  { path: 'json', component: JsonPageComponent },
  { path: 'settings', component: SettingsPageComponent }



];


@NgModule({
  declarations: [
    AppComponent,
    HelpPageComponent,
    JsonPageComponent,
    ImportPageComponent,
    SettingsPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
