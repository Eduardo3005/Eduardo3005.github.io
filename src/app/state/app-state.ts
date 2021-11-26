import { LanguageEffects } from './language/language-effects';
import { languageReducer } from './language/language-reducer';
import { LanguageState } from './language/language-state';

export interface AppState {
  Language: LanguageState;
}

export const appReducers = {
  Language: languageReducer,
};

export const appEffects = [LanguageEffects];
