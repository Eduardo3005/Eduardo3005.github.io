import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseProvider } from '../services/firebase-logger.service';
import { BaseComponent } from '../shared/base.component';
import { AppState } from '../state/app-state';

@Component({
  selector: 'app-contacts',
  templateUrl: '../../assets/templates/contacts/index.html',
  styleUrls: ['../../assets/templates/contacts/style.scss'],
})
export class ContactsComponent
  extends BaseComponent
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
