import { createFeatureSelector, createSelector } from "@ngrx/store";

export interface LanguageState {
	Language: string;
}


export const languageFeatureSelector = createFeatureSelector("Language");

export const selectLanguage = createSelector(languageFeatureSelector, (state: LanguageState) => state.Language);
