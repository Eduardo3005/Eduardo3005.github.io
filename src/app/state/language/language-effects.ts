import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { EMPTY } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { LanguageActionsTypes, setLanguage } from './language-actions';

export const LANGUAGE_KEY = 'pl-l';
@Injectable()
export class LanguageEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly translationService: TranslateService,
    private readonly store: Store
  ) {}

  initLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      switchMap(() => {
        const language = localStorage.getItem(LANGUAGE_KEY) || 'pt';
        this.store.dispatch(setLanguage({ language }));
        return [];
      })
    )
  );

  setlanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguageActionsTypes.SetLanguage),
      mergeMap(({ language }) => {
        localStorage.setItem(LANGUAGE_KEY, language);
        this.translationService.use(language);
        return [];
      })
    )
  );
}
