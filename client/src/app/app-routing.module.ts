/** Библиотеки - Системные */
import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

/** Компоненты - Layout's */
import {PageLoginComponent} from './page-login/page-login.component'
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component'
import {PageRegistrationComponent} from './page-registration/page-registration.component'
import {AppLayoutComponent} from './shared/layouts/app-layout/app-layout.component'
import {PageOverviewComponent} from './page-overview/page-overview.component'

/** Защитники роутов */
import {AuthGuard} from './shared/classes/auth.guard'

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: PageLoginComponent},
      {path: 'registration', component: PageRegistrationComponent},
    ],
  },
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'overview', component: PageOverviewComponent},
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
