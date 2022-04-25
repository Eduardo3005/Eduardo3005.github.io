import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Restaurant } from 'src/app/models/restaurant';
import SwiperCore, {
  Keyboard,
  Navigation,
  Pagination,
  Swiper,
} from 'swiper/core';
import { FirebaseProvider } from '../../services/firebase-logger.service';
import { BaseComponent } from '../../shared/base.component';
import { AppState } from '../../state/app-state';

SwiperCore.use([Navigation, Pagination, Keyboard]);

@Component({
  selector: 'app-places',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
})
export class RestaurantsComponent extends BaseComponent {

  restaurants: Array<Restaurant> = [];
  currentRestaurant: Restaurant;

  @ViewChild('openModal') openModal: ElementRef;
 
  constructor(
    readonly store: Store<AppState>,
    readonly translate: TranslateService,
    readonly firebase: FirebaseProvider
  ) {
    super(store, translate, firebase);
  }

  protected init(): void {
    this.getRestaurants();
  }

  getRestaurants() {
    this.translate.get('Restaurants').subscribe((res: Array<Restaurant>) => {
      this.restaurants = res;
    });
  }

  openImage(index: number): void {

      this.currentRestaurant = this.restaurants[index];
      setTimeout(() => {
        var swiper = this.createSwiperXXL(index);

        swiper.slideTo?.(index);

        return swiper;
      }, 1);

      this.openModal.nativeElement.click();
    
  }

  createSwiperXXL(index: number): Swiper {
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
