/** Бибилиотеки */
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
/** Компоненты */
import {AppComponent} from './app.component'
import {PageLoginComponent} from './page-login/page-login.component'
import {AppRoutingModule} from './app-routing.module'
import {AppLayoutComponent} from './shared/layouts/app-layout/app-layout.component'
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component'
import {PageRegistrationComponent} from './page-registration/page-registration.component'

/** */
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})

/** */
export class AppModule {
}

