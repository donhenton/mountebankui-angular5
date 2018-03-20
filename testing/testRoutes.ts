import { Routes, RouterModule } from '@angular/router';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from './../src/app/app.component';
import { HelpPageComponent } from './../src/app/pages/help-page/help-page.component';


const appRoutes: Routes = [
    { path: 'help', component: HelpPageComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },


];

export default appRoutes;

