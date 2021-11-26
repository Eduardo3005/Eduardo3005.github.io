import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HistoryComponent } from './components/history.component';
import { HomeComponent } from './components/home.component';
import { HouseDetailComponent } from './components/house-detail.component';
import { PlacesComponent } from './components/places.component';
import { FooterComponent } from './components/footer.component';
import { NavbarComponent } from './components/navbar.component';
import { appEffects, appReducers } from './state/app-state';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ContactsComponent } from './components/contacts.component';
import { RouterModule } from '@angular/router';
import { FirebaseProvider } from './services/firebase-logger.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HouseDetailComponent,
    HomeComponent,
    PlacesComponent,
    HistoryComponent,
    ContactsComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument(),
    TranslateModule.forRoot({
      defaultLanguage: 'pt',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [FirebaseProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
