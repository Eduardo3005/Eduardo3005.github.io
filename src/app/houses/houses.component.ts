import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { take, tap } from 'rxjs/operators';
import { AppState } from '../state/app-state';
import { selectLanguage } from '../state/language/language-state';

@Component({
  selector: 'app-Houses',
  templateUrl: './Houses.component.html',
  styleUrls: ['./Houses.component.css']
})
export class HousesComponent implements OnInit {

  constructor(
    private readonly store: Store<AppState>,
    private readonly translate: TranslateService) {}

  ngOnInit() {

    this.store
    .pipe(
      select(selectLanguage),
      tap((language: string) => {
        this.translate.use(language)
      }),
      take(1)
    ).subscribe()

    this.getHouses();
  }

  getHouses(): void {
  }
}
