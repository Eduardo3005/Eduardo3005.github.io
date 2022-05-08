import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseDetailComponent } from './components/house-detail/house-detail.component';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import {TranslateModule} from '@ngx-translate/core';
import { ContactsComponent } from './components/contacts/contacts.component';
import { ReferencesComponent } from './components/references/references.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'houses/:id', component: HouseDetailComponent },
  { path: 'references/:type', component: ReferencesComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled'}), TranslateModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
