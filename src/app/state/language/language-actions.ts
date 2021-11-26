import { createAction, props } from '@ngrx/store';

export enum LanguageActionsTypes {
  SetLanguage = '[LANGUAGE] Set language',
}

export const setLanguage = createAction(
  LanguageActionsTypes.SetLanguage,
  props<{ language: string }>()
);
