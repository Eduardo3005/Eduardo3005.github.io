import { Directive, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { EventType } from '../models/analytics/event-type.enum';
import { FirebaseProvider } from '../services/firebase-logger.service';
import { AppState } from '../state/app-state';
import { selectLanguage } from '../state/language/language-state';
import * as data from 'src/assets/imagesPathFiles.json';
import * as dataEn from 'src/assets/imagesPathFiles-en.json';

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
  imagesPathFiles: any = [];

  constructor(
    readonly store: Store<AppState>,
    readonly translate: TranslateService,
    readonly firebase: FirebaseProvider
  ) {}

  ngOnInit() {
    this.store
      .pipe(
        select(selectLanguage),
        tap((language: string) => {
          if (language == 'en') {
            this.imagesPathFiles = (dataEn as any).default;
          } else {
            this.imagesPathFiles = (data as any).default;
          }
        })
      )
      .subscribe();

    this.firebase.logEvent(EventType.EnterView);
  }

  ngOnDestroy() {
    this.firebase.logEvent(EventType.LeaveView);
  }
}
