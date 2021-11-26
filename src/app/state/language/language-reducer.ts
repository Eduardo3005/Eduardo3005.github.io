import { createReducer, on } from '@ngrx/store';
import { setLanguage } from './language-actions';
import { LanguageState } from './language-state';

export const initialState = {
  Language: 'pt',
} as LanguageState;

const reducer = createReducer(
  initialState,
  on(
    setLanguage,
    (state: LanguageState, { language }: { language: string }) => {
      return {
        Language: language,
      } as LanguageState;
    }
  )
);

export function languageReducer(state, action) {
  return reducer(state, action);
}
