
import { createReducer, on } from "@ngrx/store";
import { setLanguage } from "./language-actions";
import { LanguageState } from "./language-state";

export const initialState = {
	Language: "pt",
} as LanguageState;

const reducer = createReducer(
	initialState,
  on(setLanguage, (state: LanguageState, props: { language: string }) => {
		return {
			Language: props.language
		} as LanguageState;
	}),
);

export function languageReducer(state, action) {
	return reducer(state, action);
}
