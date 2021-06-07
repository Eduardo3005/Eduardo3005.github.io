import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseDetailComponent } from './components/house-detail.component';
import { HomeComponent } from './components/home.component';
import { PlacesComponent } from './components/places.component';
import { HistoryComponent } from './components/history.component';
import {TranslateModule} from '@ngx-translate/core';
import { ContactsComponent } from './components/contacts.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'houses/:id', component: HouseDetailComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'}), TranslateModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
