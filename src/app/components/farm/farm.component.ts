import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseProvider } from '../../services/firebase-logger.service';
import { BaseComponent } from '../../shared/base.component';
import { AppState } from '../../state/app-state';
@Component({
  selector: 'app-places',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
})
export class FarmComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  protected init(): void {}
  constructor(
    readonly store: Store<AppState>,
    readonly translate: TranslateService,
    readonly firebase: FirebaseProvider
  ) {
    super(store, translate, firebase);
  }
}
