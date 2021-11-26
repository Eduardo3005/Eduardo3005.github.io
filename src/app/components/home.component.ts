import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from '../state/app-state';
import { House } from '../models/house';
import { Place } from '../models/place';
import { FirebaseProvider } from '../services/firebase-logger.service';
import SwiperCore, {
  Keyboard,
  Navigation,
  Pagination,
  Swiper,
} from 'swiper/core';
import { BaseComponent } from '../shared/base.component';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

SwiperCore.use([Navigation, Pagination, Keyboard]);

@Component({
  selector: 'app-home',
  templateUrl: '../../assets/templates/home/index.html',
  styleUrls: ['../../assets/templates/home/style.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {
  private readonly MODAL_OPENED_ONCE_KEY = 'pl-o-o';
  houses$: Observable<House[]>;
  places$: Observable<Place>;

  slideShow$: Observable<String>;

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

    this.getSlideShow();
    this.getHouses();
    this.getPlaces();
    this.openModalIfFirstEntry();

    setTimeout(() => {
      this.initSwiper();
    }, 1000);
  }

  openModalIfFirstEntry() {
    const firstTime =
      sessionStorage.getItem(this.MODAL_OPENED_ONCE_KEY) !== 'true';
    if (!firstTime) return;

    setTimeout(() => {
      this.openModal.nativeElement.click();
      sessionStorage.setItem(this.MODAL_OPENED_ONCE_KEY, true.toString());
    }, 1000);
  }

  playVideo() {
    this.youtubeVideoPlay.nativeElement.style.display = 'none';
    this.youtubeVideo.nativeElement.style.display = 'block';
    this.video.nativeElement.src += '&autoplay=1';
  }

  getSlideShow() {
    this.slideShow$ = this.translate.onLangChange.pipe(
      map(() => this.imagesPathFiles.Home.SlideShow)
    );
  }

  getHouses() {
    this.houses$ = this.translate.onLangChange.pipe(
      switchMap(() =>
        this.translate.get('Houses').pipe(
          map((res: House[]) => {
            console.log(this.imagesPathFiles, res);
            return res.map(
              (house) =>
                ({
                  ...house,
                  ImagePath: this.imagesPathFiles.Houses.find(
                    (h: House) => h.Tipology == house.Tipology
                  )?.ImagePath,
                } as House)
            );
          })
        )
      )
    );
  }

  getPlaces() {
    this.places$ = this.translate.onLangChange.pipe(
      map(() => this.imagesPathFiles.Home.Places.List)
    );
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
