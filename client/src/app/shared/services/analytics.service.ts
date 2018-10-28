/** Модули - Системные */
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

/** Модули - Дочерние */
import {Observable} from "rxjs"

/** Интерфейсы */
import {OverviewPage} from '../interfaces/overview-page'

@Injectable({
  providedIn: 'root'
})

export class AnalyticsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getOverviews(): Observable<OverviewPage> {
    return this.http.get<OverviewPage>('/api/analytics/overview')
  }

  getAnalytics() {

  }


}
