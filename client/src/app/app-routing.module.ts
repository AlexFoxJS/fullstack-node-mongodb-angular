/** */
import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

/** */
import {PageLoginComponent} from "./page-login/page-login.component"
import {AppLayoutComponent} from "./shared/layouts/app-layout/app-layout.component"
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component"
import {PageRegistrationComponent} from "./page-registration/page-registration.component"

/** */
const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: PageLoginComponent},
      {path: 'registration', component: PageRegistrationComponent},
    ]
  },
  {
    path: '',
    component: AppLayoutComponent,
  },
]

/** */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

/** */
export class AppRoutingModule {}
