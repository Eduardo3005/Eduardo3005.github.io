import { Directive, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { EventType } from '../models/analytics/event-type.enum';
import { FirebaseProvider } from '../services/firebase-logger.service';
import { AppState } from '../state/app-state';
import * as data from 'src/assets/imagesPathFiles.json';
import * as dataEn from 'src/assets/imagesPathFiles-en.json';
import SwiperCore, {
  Keyboard,
  Navigation,
  Pagination,
  Swiper,
} from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Keyboard]);

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
  imagesPathFiles: any = [];

  constructor(
    readonly store: Store<AppState>,
    readonly translate: TranslateService,
    readonly firebase: FirebaseProvider
  ) {}

  ngOnInit() {
    this.translate.onLangChange.subscribe(() => {
      this.initContent();
    });

    this.firebase.logEvent(EventType.EnterView);
    this.initContent();
  }

  private initContent() {
    const language = this.translate.currentLang;
    if (language == 'en') {
      this.imagesPathFiles = (dataEn as any).default;
    } else {
      this.imagesPathFiles = (data as any).default;
    }
    this.init();
  }

  protected abstract init(): void;

  ngOnDestroy() {
    this.firebase.logEvent(EventType.LeaveView);
  }

  createSwiper(index: number): Swiper {
    return new Swiper('.mySwiper-xxl', {
      slidesPerView: 1,
      spaceBetween: 10,
      slidesPerGroup: 1,
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
      initialSlide: index,
    });
  }
}
