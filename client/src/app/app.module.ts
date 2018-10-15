import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppComponent} from './app.component'
import {PageLoginComponent} from './page-login/page-login.component'
import {AppRoutingModule} from "./app-routing.module";
import { AuthComponent } from './shared/layouts/auth/auth.component'

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    AuthComponent
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

