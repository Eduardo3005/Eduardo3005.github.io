import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { AppState } from '../state/app-state';
import { selectLanguage } from '../state/language/language-state';
import {
  PersonalizedService,
  WelfareActivity,
  Service,
  AdditionalService,
  OutdoorAccommodation,
  CommonAccommodation,
} from '../models/common';
import { House, Accommodation, Option } from '../models/house';
import { SlideShowElement } from '../models/slide-show-element';
import SwiperCore, { Navigation, Pagination, Swiper } from 'swiper/core';
import { FirebaseProvider } from '../services/firebase-logger.service';
import { DynamicComponent } from '../shared/base.component';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-house-detail',
  templateUrl: '../../assets/templates/house-detail/index.html',
  styleUrls: ['../../assets/templates/house-detail/style.scss'],
})
export class HouseDetailComponent
  extends DynamicComponent
  implements OnInit, OnDestroy
{
  houses: Array<House>;
  houseName: string;
  fullDescription: string;
  welfareActivities: Array<WelfareActivity>;
  personalizedServices: Array<PersonalizedService>;
  services: Array<Service>;
  additionalServices: Array<AdditionalService>;
  outdoorAccommodations: Array<OutdoorAccommodation>;
  commonAccommodations: Array<CommonAccommodation>;
  accommodations: Array<Accommodation>;
  options: Array<Option>;
  mainSlideShow: Array<SlideShowElement>;
  houseId: number;
  images: Array<string>;
  currentModalImage: string;
  @ViewChild('openModal') openModal: ElementRef;

  constructor(
    readonly store: Store<AppState>,
    readonly translate: TranslateService,
    readonly firebase: FirebaseProvider,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    super(store, translate, firebase);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.route.params.subscribe((params) => {
      this.houseId = +params['id'];
    });

    this.getHouse();
    this.getWelfareActivities();
    this.getPersonalizedServices();
    this.getServices();
    this.getAdditionalServices();
    this.getOutdoorAccommodations();
    this.getCommonAccommodations();
    setTimeout(() => {
      this.initSwiper('.mySwiper');
    }, 1000);

  }

  initSwiper(className: string): Swiper {
    return new Swiper(className, {
      fadeEffect: {
        crossFade: true,
      },
      breakpointsBase: '1000',
      loop: true,
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
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  getMainSlideShow() {
    this.translate
      .get('Home.MainSlideShow')
      .subscribe((res: Array<SlideShowElement>) => {
        this.mainSlideShow = res;
        console.log(this.mainSlideShow);
      });
  }

  getHouse() {
    this.translate.get('Houses').subscribe((res: Array<House>) => {
      this.houses = res;
      this.fullDescription = this.houses[this.houseId - 1].FullDescription;
      this.houseName = this.houses[this.houseId - 1].Name;
      this.accommodations = this.houses[this.houseId - 1].Accommodations;
      this.options = this.houses[this.houseId - 1].Options;
      this.images = this.houses[this.houseId - 1].Images;
    });
  }

  goBack(): void {
    this.location.back();
  }

  getWelfareActivities() {
    this.translate
      .get('WelfareActivities')
      .subscribe((res: Array<WelfareActivity>) => {
        this.welfareActivities = res;
      });
  }

  getPersonalizedServices() {
    this.translate
      .get('PersonalizedServices')
      .subscribe((res: Array<PersonalizedService>) => {
        this.personalizedServices = res;
      });
  }

  getServices() {
    this.translate.get('Services').subscribe((res: Array<Service>) => {
      this.services = res;
    });
  }

  getAdditionalServices() {
    this.translate
      .get('AdditionalServices')
      .subscribe((res: Array<AdditionalService>) => {
        this.additionalServices = res;
      });
  }

  getOutdoorAccommodations() {
    this.translate
      .get('OutdoorAccommodations')
      .subscribe((res: Array<OutdoorAccommodation>) => {
        this.outdoorAccommodations = res;
      });
  }

  getCommonAccommodations() {
    this.translate
      .get('CommonAccommodations')
      .subscribe((res: Array<CommonAccommodation>) => {
        this.commonAccommodations = res;
      });
  }

  openImage(index: number): void {

    if (window.innerWidth > 767) {
      this.currentModalImage = this.images[index];

      setTimeout(() => {
        var swiper = new Swiper('.mySwiper-xxl', {
          slidesPerView: 1,
          spaceBetween: 10,
          slidesPerGroup: 1,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          initialSlide: index
        });

        swiper.slideTo(index);

        return swiper;
      }, 1);

      this.openModal.nativeElement.click();
    }
  }
}
