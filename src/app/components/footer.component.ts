import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseProvider } from '../services/firebase-logger.service';
import { DynamicComponent } from '../shared/base.component';
import { AppState } from '../state/app-state';

@Component({
  selector: 'app-footer',
  templateUrl: '../../assets/templates/footer/index.html',
  styleUrls: ['../../assets/templates/footer/style.scss'],
})
export class FooterComponent extends DynamicComponent implements OnInit {
  googleMapsIconPath: string;

  constructor(
    readonly store: Store<AppState>,
    readonly translate: TranslateService,
    readonly firebase: FirebaseProvider
  ) {
    super(store, translate, firebase);
  }

  ngOnInit(): void {
    this.translate.get('Footer.GoogleMapsIconPath').subscribe((res: string) => {
      this.googleMapsIconPath = res;
    });
  }
}
