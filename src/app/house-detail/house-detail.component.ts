import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs/operators';
import { AppState } from '../state/app-state';
import { selectLanguage } from '../state/language/language-state';
import {
  PersonalizedService,
  WelfareActivity,
  Service,
  AdditionalService,
  OutdoorAccommodation,
  CommonAccommodation,
} from '../models/common';
import { House, Accommodation, Option } from '../models/house';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css'],
})
export class HouseDetailComponent implements OnInit {
  houses: Array<House>;
  houseName: string;
  fullDescription: string
  welfareActivities: Array<WelfareActivity>;
  personalizedServices: Array<PersonalizedService>;
  services: Array<Service>;
  additionalServices: Array<AdditionalService>;
  outdoorAccommodations: Array<OutdoorAccommodation>;
  commonAccommodations: Array<CommonAccommodation>;
  accommodations: Array<Accommodation>;
  options: Array<Option>;

  constructor(
    private readonly store: Store<AppState>,
    private readonly translate: TranslateService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {

    this.houses = []

    this.store
      .pipe(
        select(selectLanguage),
        tap((language: string) => {
          this.translate.use(language);
        })
      )
      .subscribe();

    this.getHouse();
    this.getWelfareActivities();
    this.getPersonalizedServices();
    this.getServices();
    this.getAdditionalServices();
    this.getOutdoorAccommodations();
    this.getCommonAccommodations()

  }

  getHouse(){
    this.translate.get("Houses").subscribe((res : Array<House>) => {
      this.houses = res
      const id = +this.route.snapshot.paramMap.get('id');
      this.fullDescription = this.houses[id-1].FullDescription
      this.houseName = this.houses[id-1].Name
      this.accommodations = this.houses[id-1].Accommodations
      this.options = this.houses[id-1].Options;
    });
  }

  goBack(): void {
    this.location.back();
  }

  getWelfareActivities() {
    this.translate
      .get('WelfareActivities')
      .subscribe((res: Array<WelfareActivity>) => {
        this.welfareActivities = res;
      });
  }

  getPersonalizedServices() {
    this.translate
      .get('PersonalizedServices')
      .subscribe((res: Array<PersonalizedService>) => {
        this.personalizedServices = res;
      });
  }

  getServices() {
    this.translate.get('Services').subscribe((res: Array<Service>) => {
      this.services = res;
    });
  }

  getAdditionalServices() {
    this.translate
      .get('AdditionalServices')
      .subscribe((res: Array<AdditionalService>) => {
        this.additionalServices = res;
      });
  }

  getOutdoorAccommodations() {
    this.translate
      .get('OutdoorAccommodations')
      .subscribe((res: Array<OutdoorAccommodation>) => {
        this.outdoorAccommodations = res;
      });
  }

  getCommonAccommodations() {
    this.translate
      .get('CommonAccommodations')
      .subscribe((res: Array<CommonAccommodation>) => {
        this.commonAccommodations = res;
      });
  }
}
