import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HousesComponent } from './houses/houses.component';
import { HouseDetailComponent } from './house-detail/house-detail.component';
import { HomeComponent } from './home/home.component';
import { PlacesComponent } from './places/places.component';
import { HistoryComponent } from './history/history.component';
import {TranslateModule} from '@ngx-translate/core';
import { ContactsComponent } from './contacts/contacts.component';


const routes: Routes = [
  { path: 'houses', component: HousesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'houses/:id', component: HouseDetailComponent },
  { path: 'places', component: PlacesComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TranslateModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
