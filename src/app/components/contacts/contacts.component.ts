import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { FirebaseProvider } from '../../services/firebase-logger.service';
import { AppState } from '../../state/app-state';

@Component({
  selector: 'app-contacts',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
})
export class ContactsComponent
  extends BaseComponent implements OnInit, OnDestroy
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
