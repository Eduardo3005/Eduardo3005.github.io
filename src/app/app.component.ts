import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(
		private readonly translate: TranslateService
	) {
  }

  ngOnInit(): void {
    this.setLanguage()
  }


  private setLanguage(): void {
		this.translate.setDefaultLang("pt");
		this.translate.use("pt");
	}
}
