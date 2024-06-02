import { Component } from '@angular/core';
import { TranslationService } from './core/services/translation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fresh-cart';
  currentLanguage: any = 'en';

  constructor(private _TranslationService: TranslationService,private translate: TranslateService) {
    if (
      localStorage.getItem('CurrentLanguage') != 'ar' &&
      localStorage.getItem('CurrentLanguage') != 'en'
    ) {
      this.currentLanguage = 'en';
    } else {
      this.currentLanguage =
        localStorage.getItem('CurrentLanguage') || 'en';
    }
    this.translate.use(this.currentLanguage);
    this._TranslationService.switchLanguage(this.currentLanguage);
    const body = document.getElementsByTagName('body');
    this._TranslationService.lang.subscribe((lang) => {
      // this if condition to check direction of all project according to current language
      if (lang == 'ar') {
        body[0].setAttribute('dir', 'rtl');
        body[0].style.fontFamily = "'Cairo', sans-serif";
      } else {
        body[0].setAttribute('dir', 'ltr');
        body[0].style.fontFamily = "'Montserrat', sans-serif";
      }
    });

  }
  switchLanguage(lang: string) {
    this._TranslationService.switchLanguage(lang);
  }

}
