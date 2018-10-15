/** Бибилиотеки - Системные*/
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

/** Бибилиотеки - Дочерние*/
import {NotifierModule, NotifierOptions} from 'angular-notifier'

/** Компоненты */
import {AppComponent} from './app.component'
import {PageLoginComponent} from './page-login/page-login.component'
import {AppRoutingModule} from './app-routing.module'
import {AppLayoutComponent} from './shared/layouts/app-layout/app-layout.component'
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component'
import {PageRegistrationComponent} from './page-registration/page-registration.component'

/** Custom angular notifier options */
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
}

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    AppLayoutComponent,
    AuthLayoutComponent,
    PageRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule,
    NotifierModule.withConfig(customNotifierOptions),
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}

