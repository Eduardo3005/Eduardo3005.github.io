import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: '../../assets/templates/footer/index.html',
  styleUrls: ['../../assets/templates/footer/style.scss']
})
export class FooterComponent implements OnInit {

  googleMapsIconPath : string;

  constructor(
    readonly translate: TranslateService,
  ) {
  }

  ngOnInit(): void {

    this.translate.get('Footer.GoogleMapsIconPath').subscribe((res: string) => {
      this.googleMapsIconPath = res;
    });
  }

}
