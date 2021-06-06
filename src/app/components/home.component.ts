import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {  TranslateService } from '@ngx-translate/core';
import { AppState } from '../state/app-state';
import { selectLanguage } from '../state/language/language-state';
import { tap } from 'rxjs/operators';
import { SlideShowElement } from '../models/slide-show-element';
import { House } from '../models/house';
import { Place } from '../models/place';
import { FirebaseProvider } from '../services/firebase-logger.service';

@Component({
  selector: 'app-home',
  templateUrl: '../../assets/templates/home/index.html',
  styleUrls: ['../../assets/templates/home/style.css'],
})
export class HomeComponent implements OnInit {

  browserLang: string;
  title: string;
  mainSlideShow: Array<SlideShowElement>;
  houseT1SlideShow: Array<SlideShowElement>;
  houseT2SlideShow: Array<SlideShowElement>;
  houseT3SlideShow: Array<SlideShowElement>;
  houses: Array<House>;
  places: Array<Place>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly translate: TranslateService,
    private readonly firebase: FirebaseProvider
  ) {

  }

  ngOnInit() {
    this.mainSlideShow = []
    this.houses = []
    this.store
			.pipe(
				select(selectLanguage),
				tap((language: string) => {
          this.translate.use(language)
				})
			).subscribe()

      this.getMainSlideShow();
      this.getHouses();
      this.getPlaces();
  }

  getMainSlideShow(){
    this.translate.get("Home.MainSlideShow").subscribe((res : Array<SlideShowElement>) => {
      this.mainSlideShow = res
      console.log(this.mainSlideShow)
    });
  }

  getHouses(){
    this.translate.get("Houses").subscribe((res : Array<House>) => {
      this.houses = res
    });
  }

  getPlaces(){
    this.translate.get("Home.Places.List").subscribe((res : Array<Place>) => {
      this.places = res
    });
  }
}
