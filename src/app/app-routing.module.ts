import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { HomeComponent } from './components/home/home.component';
import { PlacesComponent } from './components/places/places.component';
import { HistoryComponent } from './components/history/history.component';
import {TranslateModule} from '@ngx-translate/core';
import { ContactsComponent } from './components/contacts/contacts.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { FarmComponent } from './components/farm/farm.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'houses/:id', component: HouseDetailComponent },
  { path: 'what-to-do/places', component: PlacesComponent },
  { path: 'what-to-do/farm', component: FarmComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'}), TranslateModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
