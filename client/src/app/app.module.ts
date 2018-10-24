/** Бибилиотеки - Системные*/
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

/** Бибилиотеки - Дочерние*/
import {NotifierModule} from 'angular-notifier'

/** Системные файлы */
import {AppComponent} from './app.component'
import {AppRoutingModule} from './app-routing.module'

/** Интерсепторы */
import {TokenInterceptor} from './shared/classes/token.interceptor'

/** Layout's - Глобальные */
import {AppLayoutComponent} from './shared/layouts/app-layout/app-layout.component'
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component'

/** Layout's - Отдельных страниц */
import {PageOrderComponent} from './pages/page-order/page-order.component'
import {PageLoginComponent} from './pages/page-login/page-login.component'
import {PageHistoryComponent} from './pages/page-history/page-history.component'
import {PageOverviewComponent} from './pages/page-overview/page-overview.component'
import {PageAnalyticsComponent} from './pages/page-analytics/page-analytics.component'
import {PageCategoriesComponent} from './pages/page-categories/page-categories.component'
import {PageRegistrationComponent} from './pages/page-registration/page-registration.component'
import {LoaderComponent} from './shared/components/loader/loader.component'
import {CategoriesFormComponent} from './pages/page-categories/components/categories-form/categories-form.component'
import {PositionsFormComponent} from './pages/page-categories/components/positions-form/positions-form.component'
import {OrderCategoriesComponent} from './pages/page-order/order-categories/order-categories.component'
import {OrderPositionsComponent} from './pages/page-order/order-positions/order-positions.component'

/** Импорты конфигов */
import {notifierOptions} from './config/notifier'

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    AppLayoutComponent,
    AuthLayoutComponent,
    PageRegistrationComponent,
    PageOverviewComponent,
    PageAnalyticsComponent,
    PageHistoryComponent,
    PageOrderComponent,
    PageCategoriesComponent,
    LoaderComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule,
    NotifierModule.withConfig(notifierOptions),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
