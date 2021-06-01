import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(
		private readonly translate: TranslateService
	) {
    console.log(environment.production); // Logs false for default environment
  }

  ngOnInit(): void {
    this.setLanguage()
  }


  private setLanguage(): void {
		this.translate.setDefaultLang("pt");
		this.translate.use("pt");
	}
}