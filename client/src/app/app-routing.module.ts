/** Библиотеки - Системные */
import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

/** Layout's - Глобальные */
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component'
import {AppLayoutComponent} from './shared/layouts/app-layout/app-layout.component'

/** Layout's - Отдельных страниц */
import {PageLoginComponent} from './pages/page-login/page-login.component'
import {PageOrderComponent} from './pages/page-order/page-order.component'
import {PageHistoryComponent} from './pages/page-history/page-history.component'
import {PageOverviewComponent} from './pages/page-overview/page-overview.component'
import {PageAnalyticsComponent} from './pages/page-analytics/page-analytics.component'
import {PageCategoriesComponent} from './pages/page-categories/page-categories.component'
import {PageRegistrationComponent} from './pages/page-registration/page-registration.component'

/** Layout's - Дочерние страницы */
import {CategoriesFormComponent} from './pages/page-categories/components/categories-form/categories-form.component'
import {OrderCategoriesComponent} from './pages/page-order/order-categories/order-categories.component'
import {OrderPositionsComponent} from './pages/page-order/order-positions/order-positions.component'

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
      {path: 'analytics', component: PageAnalyticsComponent},
      {path: 'history', component: PageHistoryComponent},
      {path: 'order', component: PageOrderComponent, children: [
          {path: '', component: OrderCategoriesComponent},
          {path: ':id', component: OrderPositionsComponent},
      ]},
      {path: 'categories', component: PageCategoriesComponent},
      {path: 'categories/new', component: CategoriesFormComponent},
      {path: 'categories/:id', component: CategoriesFormComponent},
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {
}
