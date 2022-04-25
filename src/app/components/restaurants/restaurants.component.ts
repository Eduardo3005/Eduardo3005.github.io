import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Reference } from 'src/app/models/reference';
import { FirebaseProvider } from '../../services/firebase-logger.service';
import { BaseComponent } from '../../shared/base.component';
import { AppState } from '../../state/app-state';

@Component({
  selector: 'app-places',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
})
export class RestaurantsComponent extends BaseComponent {

  restaurants: Array<Reference> = [];
  currentRestaurant: Reference;

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
    this.translate.get('Restaurants').subscribe((res: Array<Reference>) => {
      this.restaurants = res;
    });
  }

  openImage(index: number): void {

      this.currentRestaurant = this.restaurants[index];
      setTimeout(() => {
        var swiper = this.createSwiper(index);

        swiper.slideTo?.(index);

        return swiper;
      }, 1);

      this.openModal.nativeElement.click();
    
  }
}
