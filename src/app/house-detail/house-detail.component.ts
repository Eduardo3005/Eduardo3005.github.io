import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { AppState } from '../state/app-state';
import { selectLanguage } from '../state/language/language-state';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css']
})
export class HouseDetailComponent implements OnInit {

   houseName: string;

  constructor(
    private readonly store: Store<AppState>,
    private readonly translate: TranslateService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {

    this.store
    .pipe(
      select(selectLanguage),
      tap((language: string) => {
        this.translate.use(language)
      })
    ).subscribe()

    const id = +this.route.snapshot.paramMap.get('id');

    this.houseName = "Casa " + id;
  }

  goBack(): void {
    this.location.back();
  }
}
