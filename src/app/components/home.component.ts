import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '../state/app-state';
import { House } from '../models/house';
import { Place } from '../models/place';
import { FirebaseProvider } from '../services/firebase-logger.service';
import SwiperCore, { Keyboard, Navigation, Pagination, Swiper } from 'swiper/core';
import { DynamicComponent } from '../shared/base.component';

SwiperCore.use([Navigation, Pagination, Keyboard]);

@Component({
  selector: 'app-home',
  templateUrl: '../../assets/templates/home/index.html',
  styleUrls: ['../../assets/templates/home/style.scss'],
})
export class HomeComponent extends DynamicComponent implements OnInit, OnDestroy {
  houses: Array<House>;
  places: Array<Place>;
  slideShow: Array<String>;

  @ViewChild('openModal') openModal: ElementRef;
  @ViewChild('sponsorshipsModal') sponsorshipsModal: ElementRef;
  @ViewChild('youtubeVideoPlay') youtubeVideoPlay: ElementRef;
  @ViewChild('youtubeVideo') youtubeVideo: ElementRef;
  @ViewChild('video') video: ElementRef;

  constructor(
    readonly store: Store<AppState>,
    readonly translate: TranslateService,
    readonly firebase: FirebaseProvider
  ) {
    super(store, translate, firebase);
  }

  ngOnInit() {

    super.ngOnInit();

    this.slideShow = [];
    this.houses = [];

    this.getSlideShow();
    this.getHouses();
    this.getPlaces();

    setTimeout(() => {
      this.initSwiper();
    }, 1000);
  }

  playVideo(){
    this.youtubeVideoPlay.nativeElement.style.display='none';
    this.youtubeVideo.nativeElement.style.display='block';
    this.video.nativeElement.src += "?autoplay=1";
  }

  getSlideShow() {
    this.slideShow = this.imagesPathFiles.Home.SlideShow;
  }

  getHouses() {
    
    this.translate.get('Houses').subscribe((res: Array<House>) => {
      res.forEach(house => {
        let houseImages = this.imagesPathFiles.Houses.find((h: House) => h.Tipology == house.Tipology)

        house.ImagePath = houseImages.ImagePath;

        this.houses.push(house)
      });
    });
  }

  getPlaces() {
    this.translate.get('Home.Places.List').subscribe((res: Array<Place>) => {
      this.places = res;
    });
  }

  initSwiper(): Swiper {
    return new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
