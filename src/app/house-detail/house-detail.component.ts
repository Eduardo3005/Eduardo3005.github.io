import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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

// core version + navigation, pagination modules:
import SwiperCore, { Navigation, Pagination, Swiper } from 'swiper/core';

// configure Swiper to use modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css'],
})
export class HouseDetailComponent implements OnInit {
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

  constructor(
    private readonly store: Store<AppState>,
    private readonly translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.houseId = +params['id'];
    });

    this.store
      .pipe(
        select(selectLanguage),
        tap((language: string) => {
          this.translate.use(language);
        })
      )
      .subscribe();

    this.getHouse();
    this.getWelfareActivities();
    this.getPersonalizedServices();
    this.getServices();
    this.getAdditionalServices();
    this.getOutdoorAccommodations();
    this.getCommonAccommodations();
    this.getMainSlideShow();

    var swiper = new Swiper('.mySwiper', {
      fadeEffect: {
            crossFade: true
        },
      breakpointsBase: '1000',
      loop: true,
      loopFillGroupWithBlank: true,
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
          slidesPerView: 3,
          spaceBetween: 30,
          slidesPerGroup: 3,
        }
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
}
