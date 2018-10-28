/** Модули - Системные */
import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core'

/** Модули - Дочерние */
import {Subscription} from 'rxjs'

/** Сервисы */
import {AnalyticsService} from '../../shared/services/analytics.service'

/** Интерфейсы */
import {AnalyticsPage} from '../../shared/interfaces/analytics-page'

@Component({
  selector: 'app-page-analytics',
  templateUrl: './page-analytics.component.html',
  styleUrls: ['./page-analytics.component.css']
})
export class PageAnalyticsComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gainChart') gainChartRef: ElementRef
  @ViewChild('orderChart') orderChartRef: ElementRef

  public subscription: Subscription
  public averageCheck: number = 0
  public pending: boolean = true

  constructor(
    private analyticsService: AnalyticsService
  ) {
  }

  ngAfterViewInit() {
    this.subscription = this.analyticsService.getAnalytics().subscribe((data: AnalyticsPage) => {
      // TODO: Удалить "mock" данные после появления настоящих данных для отрисвки графиков в базе
      const mockData = {
        averageCheck: 1355,
        chart: [
          {
            gain: 500,
            order: 1,
            label: '03.10.2018',
          },
          {
            gain: 855,
            order: 2,
            label: '07.10.2018',
          },
        ]
      }

      this.averageCheck = mockData.averageCheck
      this.pending = false
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
