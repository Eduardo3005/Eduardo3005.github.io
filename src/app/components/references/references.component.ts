import {
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class ReferencesComponent extends BaseComponent {

  references: Array<Reference> = [];
  currentReference: Reference;
  type: string;
  title: string;
  tooltip: string;

  @ViewChild('openModal') openModal: ElementRef;

  constructor(
    readonly store: Store<AppState>,
    readonly translate: TranslateService,
    readonly firebase: FirebaseProvider,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(store, translate, firebase);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  protected init(): void {
    const { params } = this.route.snapshot;

    this.getReferences(params.type);
  }

  getTitleAndTooltip(path: string){

    this.translate.get(path + ".Title").subscribe((res: string) => {
      this.title = res
    });

    this.translate.get(path + ".Tooltip").subscribe((res: string) => {
      this.tooltip = res
    });
  }

  getReferencesList(path: string){
    this.translate.get(path).subscribe((res: Array<Reference>) => {
      debugger;
      this.references = res;
    });
  }

  getReferences(type: string) {

    switch(type) {
      case "restaurants": {
        this.getTitleAndTooltip('References.Restaurants');
        this.getReferencesList('Restaurants')
        break;
      }
      case "farm": {
        this.getTitleAndTooltip('References.Farm');
        this.getReferencesList('FarmActivities')
        break;
      }
      case "places": {
        this.getTitleAndTooltip('References.Places');
        this.getReferencesList('Places')
        break;
     }
   }
  }

  openImage(index: number): void {

      this.currentReference = this.references[index];
      setTimeout(() => {
        var swiper = this.createSwiper(index);

        swiper.slideTo?.(index);

        return swiper;
      }, 1);

      this.openModal.nativeElement.click();

  }
}
