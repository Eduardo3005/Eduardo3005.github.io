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

  restaurants: Array<Restaurant> = []

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
}
