import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { FirebaseProvider } from '../../services/firebase-logger.service';
import { BaseComponent } from '../../shared/base.component';
import { AppState } from '../../state/app-state';

@Component({
  selector: 'app-footer',
  templateUrl: 'index.html',
  styleUrls: ['style.scss'],
})
export class FooterComponent extends BaseComponent {

  privacyPoliciesFilePath : string = null;
  projectTechnicalSheetPath : string = null
  termsAndConditionsPath: string = null

  constructor(
    readonly store: Store<AppState>,
    readonly translate: TranslateService,
    readonly firebase: FirebaseProvider
  ) {
    super(store, translate, firebase);
  }

  protected init(): void {
    this.getFilesPaths();
  }

  getFilesPaths() {
    this.privacyPoliciesFilePath = null
    this.projectTechnicalSheetPath = null
    this.termsAndConditionsPath = null

    this.privacyPoliciesFilePath = this.imagesPathFiles.Files.PrivacyPoliciesFilePath;
    this.projectTechnicalSheetPath = this.imagesPathFiles.Files.ProjectTechnicalSheetPath;
    this.termsAndConditionsPath = this.imagesPathFiles.Files.TermsAndConditionsPath;
  }
}
