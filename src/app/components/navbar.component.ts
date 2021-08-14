import { Component, HostListener, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/state/app-state';
import { setLanguage } from 'src/app/state/language/language-actions';
import { selectLanguage } from 'src/app/state/language/language-state';
import { House } from '../models/house';

@Component({
  selector: 'app-navbar',
  templateUrl: '../../assets/templates/navbar/index.html',
  styleUrls: ['../../assets/templates/navbar/style.scss'],
})
export class NavbarComponent implements OnInit {

  houseNames: Array<String>;
  active = false


  constructor(
    private readonly store: Store<AppState>,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.houseNames = []
    this.store
      .pipe(
        select(selectLanguage),
        tap((language: string) => {
          this.translate.use(language);
        })
      )
      .subscribe();

      this.getHouseNames();
  }

  setLanguage(language: string) {
    this.store.dispatch(setLanguage({ language }));
  }

  getHouseNames(){
    this.translate.get("Houses").subscribe((res : Array<House>) => {
      res.forEach((house) => { this.houseNames.push(house.Name)});
    });
  }
}
