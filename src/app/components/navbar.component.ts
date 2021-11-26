import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { AppState } from 'src/app/state/app-state';
import { setLanguage } from 'src/app/state/language/language-actions';
import { selectLanguage } from 'src/app/state/language/language-state';
import { House } from '../models/house';
import * as data from 'src/assets/imagesPathFiles.json';
import * as dataEn from 'src/assets/imagesPathFiles-en.json';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: '../../assets/templates/navbar/index.html',
  styleUrls: ['../../assets/templates/navbar/style.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  houseNames: string[] = [];
  active = false;
  imagesPathFiles: any = [];
  imagePathsSub: Subscription;

  constructor(
    private readonly store: Store<AppState>,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.imagePathsSub = this.store
      .pipe(
        select(selectLanguage),
        tap((language: string) => {
          if (language == 'en') {
            this.imagesPathFiles = (dataEn as any).default;
          } else {
            this.imagesPathFiles = (data as any).default;
          }
        })
      )
      .subscribe();

    this.getHouseNames();
  }

  ngOnDestroy(): void {
    this.imagePathsSub?.unsubscribe();
  }

  setLanguage(language: string) {
    this.store.dispatch(setLanguage({ language }));
  }

  getHouseNames() {
    this.translate.get('Houses').subscribe((res: Array<House>) => {
      res.forEach((house) => {
        this.houseNames.push(house.Name);
      });

      // To not include events
      this.houseNames.pop();
    });
  }
}
