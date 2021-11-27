import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import SwiperCore, {
  Keyboard,
  Navigation,
  Pagination,
  Swiper,
} from 'swiper/core';
import {
  AdditionalService,
  CommonAccommodation,
  OutdoorAccommodation,
  PersonalizedService,
  Service,
  WelfareActivity,
} from '../../models/common';
import { Accommodation, House, Option } from '../../models/house';
import { Image } from '../../models/image';
import { SlideShowElement } from '../../models/slide-show-element';
import { FirebaseProvider } from '../../services/firebase-logger.service';
import { BaseComponent } from '../../shared/base.component';
import { AppState } from '../../state/app-state';

SwiperCore.use([Navigation, Pagination, Keyboard]);

@Component({
  selector: 'app-house-detail',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
})
export class HouseDetailComponent
  extends BaseComponent
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
  images: Array<Image>;
  currentModalImage: string;
  mainImagePath: string;

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
    const { params } = this.route.snapshot;
    this.houseId = +params['id'];
    super.ngOnInit();

    
  }

  protected init(): void {
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
      this.images = this.imagesPathFiles.Houses[this.houseId - 1].Images;
      this.mainImagePath =
        this.imagesPathFiles.Houses[this.houseId - 1].ImagePath;
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
