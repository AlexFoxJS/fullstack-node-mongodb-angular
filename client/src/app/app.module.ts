import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppComponent} from './app.component'
import {PageLoginComponent} from './page-login/page-login.component'
import {AppRoutingModule} from "./app-routing.module"
import { AppLayoutComponent } from './shared/layouts/app-layout/app-layout.component'
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component'

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    AppLayoutComponent,
    AuthLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

