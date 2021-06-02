import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { AppState } from '../state/app-state';
import { selectLanguage } from '../state/language/language-state';
@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  constructor(
    private readonly store: Store<AppState>,
    private readonly translate: TranslateService) {}

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
