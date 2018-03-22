import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HelpPageComponent } from './pages/help-page/help-page.component';
import { JsonPageComponent } from './pages/json-page/json-page.component';
import { ImportPageComponent } from './pages/import-page/import-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LocalStorageModule} from './modules/local-storage/local-storage.module';
import { LocalStorageService } from './services/local-storage.service';
import { ImpostersService } from './services/imposters.service';
import { MountebankService } from './services/mountebank.service';
import { AlertModule} from 'ngx-bootstrap/alert';
import { ImposterSelectorComponent } from './shared/imposter-selector/imposter-selector.component';

const appRoutes: Routes = [
  { path: 'help', component: HelpPageComponent },
  { path: 'import', component: ImportPageComponent },
  { path: 'json', component: JsonPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },


];


@NgModule({
  declarations: [
    AppComponent,
    HelpPageComponent,
    JsonPageComponent,
    ImportPageComponent,
    SettingsPageComponent,
    HomePageComponent,
    ImposterSelectorComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    LocalStorageModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LocalStorageService, ImpostersService, MountebankService],
  bootstrap: [AppComponent]
})
export class AppModule { }
