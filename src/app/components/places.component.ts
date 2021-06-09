import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { FirebaseProvider } from '../services/firebase-logger.service';
import { DynamicComponent } from '../shared/base.component';
import { AppState } from '../state/app-state';
import { selectLanguage } from '../state/language/language-state';
@Component({
  selector: 'app-places',
  templateUrl: '../../assets/templates/places/index.html',
  styleUrls: ['../../assets/templates/places/style.scss'],
})
export class PlacesComponent
  extends DynamicComponent
  implements OnInit, OnDestroy
{
  constructor(
    readonly store: Store<AppState>,
    readonly translate: TranslateService,
    readonly firebase: FirebaseProvider
  ) {
    super(store, translate, firebase);
  }

}
