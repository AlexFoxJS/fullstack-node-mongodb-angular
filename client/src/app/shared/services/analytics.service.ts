/** Модули - Системные */
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

/** Модули - Дочерние */
import {Observable} from "rxjs"

/** Интерфейсы */
import {OverviewPage} from '../interfaces/overview-page'
import {AnalyticsPage} from '../interfaces/analytics-page'

@Injectable({
  providedIn: 'root'
})

export class AnalyticsService {

  constructor(
    private http: HttpClient
  ) {
  }

  /** Получение данных для вывода страницы "Обзор" */
  getOverviews(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>('/api/analytics/overview')
  }

  /** Получение данных для вывода страницы "Аналитики" */
  getAnalytics(): Observable<AnalyticsPage> {
    return this.http.get<AnalyticsPage>('/api/analytics/analytics')
  }


}
