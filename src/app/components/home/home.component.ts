import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '../../state/app-state';
import { House } from '../../models/house';
import { Place } from '../../models/place';
import { FirebaseProvider } from '../../services/firebase-logger.service';
import SwiperCore, {
  Keyboard,
  Navigation,
  Pagination,
  Swiper,
} from 'swiper/core';
import { BaseComponent } from '../../shared/base.component';

SwiperCore.use([Navigation, Pagination, Keyboard]);

@Component({
  selector: 'app-home',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {
  private readonly MODAL_OPENED_ONCE_KEY = 'pl-o-o';
  houses: Array<House> = [];
  places: Array<Place> = [];
  slideShow: Array<String> = [];

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
    this.openModalIfFirstEntry();
  }

  openModalIfFirstEntry() {
    const firstTime =
      sessionStorage.getItem(this.MODAL_OPENED_ONCE_KEY) !== 'true';
    if (!firstTime) return;

    setTimeout(() => {
      //this.openModal.nativeElement.click();
      sessionStorage.setItem(this.MODAL_OPENED_ONCE_KEY, true.toString());
      this.initSwiper();
    }, 1000);
  }

  protected init(): void {
    this.houses = [];
    this.places = [];
    this.slideShow = [];
    this.getSlideShow();
    this.getHouses();
    this.getPlaces();

    setTimeout(() => {
      this.initSwiper();
    }, 1000);
  }

  playVideo() {
    this.youtubeVideoPlay.nativeElement.style.display = 'none';
    this.youtubeVideo.nativeElement.style.display = 'block';
    this.video.nativeElement.src += '&autoplay=1';
  }

  getSlideShow() {
    this.slideShow = this.imagesPathFiles.Home.SlideShow;
  }

  getHouses() {
    this.translate.get('Houses').subscribe((res: Array<House>) => {
      res.forEach((house) => {
        let houseImages = this.imagesPathFiles.Houses.find(
          (h: House) => h.Tipology == house.Tipology
        );

        house.ImagePath = houseImages.ImagePath;

        this.houses.push(house);
      });
    });
  }

  getPlaces() {
    this.places = this.imagesPathFiles.Home.Places.List;
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
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}