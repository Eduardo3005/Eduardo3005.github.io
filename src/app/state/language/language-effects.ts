import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { AppState } from "../app-state";

@Injectable()
export class ApplicationsEffects {
	constructor(
		private readonly actions$: Actions,
		translationService: TranslateService,
		store: Store<AppState>
	) {
	}


}
