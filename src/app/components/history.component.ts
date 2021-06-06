import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { FirebaseProvider } from '../services/firebase-logger.service';
import { AppState } from '../state/app-state';
import { selectLanguage } from '../state/language/language-state';


@Component({
  selector: 'app-history',
  templateUrl: '../../assets/templates/history/index.html',
  styleUrls: ['../../assets/templates/history/style.css']
})
export class HistoryComponent implements OnInit {

  constructor(
    private readonly store: Store<AppState>,
    private readonly translate: TranslateService,
    private readonly firebase: FirebaseProvider) {}

  ngOnInit(): void {

    this.store
    .pipe(
      select(selectLanguage),
      tap((language: string) => {
        this.translate.use(language)
      })
    ).subscribe()
  }

}
