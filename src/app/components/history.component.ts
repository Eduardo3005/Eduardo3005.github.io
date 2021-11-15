import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Image } from '../models/image';
import { FirebaseProvider } from '../services/firebase-logger.service';
import { DynamicComponent } from '../shared/base.component';
import { AppState } from '../state/app-state';
import SwiperCore, { Keyboard, Navigation, Pagination, Swiper } from 'swiper/core';

SwiperCore.use([Navigation, Pagination, Keyboard]);


@Component({
  selector: 'app-history',
  templateUrl: '../../assets/templates/history/index.html',
  styleUrls: ['../../assets/templates/history/style.scss'],
})
export class HistoryComponent
  extends DynamicComponent
  implements OnInit, OnDestroy
{

  images: Array<string>;
  historyImages: Array<Image>
  currentModalImage: string;
  @ViewChild('openModal') openModal: ElementRef;
  @ViewChild('openHistoryModal') openHistoryModal: ElementRef;

  constructor(
    readonly store: Store<AppState>,
    readonly translate: TranslateService,
    readonly firebase: FirebaseProvider
  ) {
    super(store, translate, firebase);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.images = []

    this.getFarmImages()
    this. getHistoryImages()

    setTimeout(() => {
      this.initSwiper('.mySwiper');
    }, 1000);
  }

  initSwiper(className: string): Swiper {
    return new Swiper(className, {
      loop : true,
      breakpointsBase: '1000',
      breakpoints: {
        '480': {
          slidesPerView: 1,
          spaceBetween: 10,
          slidesPerGroup: 1,
        },
        '736': {
          slidesPerView: 2,
          spaceBetween: 20,
          slidesPerGroup: 2,
        },
        '1000': {
          slidesPerView: 4,
          spaceBetween: 30,
          slidesPerGroup: 4,
        },
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
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      }
    });
  }

  openImage(index: number): void {

    if (window.innerWidth > 767) {
      this.currentModalImage = this.images[index];

      setTimeout(() => {
        var swiper = this.createSwiperXXL(index)

        swiper.slideTo(index);

        return swiper;
      }, 1);

      this.openModal.nativeElement.click();
    }
  }

  openHistoryImage(index: number): void {

    if (window.innerWidth > 767) {
      this.currentModalImage = this.historyImages[index].Path;

      setTimeout(() => {
        var swiper = this.createSwiperXXL(index)
        swiper.slideTo(index);

        return swiper;
      }, 1);

      this.openHistoryModal.nativeElement.click();
    }
  }

  createSwiperXXL(index: number) : Swiper{
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
        dynamicBullets: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      initialSlide: index
    });
  }

  

  getFarmImages() {

    this.images = this.imagesPathFiles.History.Images;
  }

  getHistoryImages() {
    
    this.historyImages = this.imagesPathFiles.History.HistoryImages;
  }


}
