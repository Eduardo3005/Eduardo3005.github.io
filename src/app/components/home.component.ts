import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {  TranslateService } from '@ngx-translate/core';
import { AppState } from '../state/app-state';
import { selectLanguage } from '../state/language/language-state';
import { tap } from 'rxjs/operators';
import { House } from '../models/house';
import { Place } from '../models/place';
import { FirebaseProvider } from '../services/firebase-logger.service';
import SwiperCore, { Navigation, Pagination, Swiper } from 'swiper/core';

SwiperCore.use([Navigation, Pagination]);


@Component({
  selector: 'app-home',
  templateUrl: '../../assets/templates/home/index.html',
  styleUrls: ['../../assets/templates/home/style.scss'],
})
export class HomeComponent implements OnInit {

  houses: Array<House>;
  places: Array<Place>;
  slideShow: Array<String>;

  @ViewChild('openModal') openModal:ElementRef;
  @ViewChild('sponsorshipsModal') sponsorshipsModal:ElementRef;


  constructor(
    private readonly store: Store<AppState>,
    private readonly translate: TranslateService,
    private readonly firebase: FirebaseProvider
  ) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.openModal.nativeElement.click();

    }, 1000);
    setTimeout(() => {
      this.sponsorshipsModal.nativeElement.click();

    }, 1000);




    this.slideShow = []
    this.houses = []
    this.store
			.pipe(
				select(selectLanguage),
				tap((language: string) => {
          this.translate.use(language)
				})
			).subscribe()

      this.getSlideShow()
      this.getHouses();
      this.getPlaces();


      setTimeout(() => {
        this.initSwiper();
      }, 1000);


  }

  getSlideShow(){
    this.translate.get("Home.SlideShow").subscribe((res : Array<String>) => {
      this.slideShow = res
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

  initSwiper(): Swiper{
    return new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

}
