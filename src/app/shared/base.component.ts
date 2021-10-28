import { HttpClient } from '@angular/common/http';
import { Directive, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventType } from '../models/analytics/event-type.enum';
import { FirebaseProvider } from '../services/firebase-logger.service';
import { AppState } from '../state/app-state';
import { selectLanguage } from '../state/language/language-state';
import * as data from 'src/assets/imagesPathFiles.json';

@Directive()
export abstract class DynamicComponent implements OnInit, OnDestroy {

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
          this.translate.use(language)
				})
			).subscribe()

    this.firebase.logEvent(EventType.EnterView);

    this.imagesPathFiles = (data as any).default;
    
    console.log(data);

  
  }

  ngOnDestroy() {
    this.firebase.logEvent(EventType.LeaveView);
  }
}
