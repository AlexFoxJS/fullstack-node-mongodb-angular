/** Модули - Системные */
import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core'

/** Модули - Дочерние */
import {Subscription} from 'rxjs'

/** Модули - Сторонние */
import {Chart} from 'chart.js'

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
    const gainChartConfig: any = {
      label: 'Выручка',
      color: 'rgba(255, 99, 132, 1)'
    }
    const orderChartConfig: any = {
      label: 'Заказы',
      color: 'rgba(54, 162, 235, 1)'
    }

    this.subscription = this.analyticsService.getAnalytics().subscribe((data: AnalyticsPage) => {
      console.log('getAnalytics', data)
      // TODO: Удалить "mock" данные после появления настоящих данных для отрисвки графиков в базе
      const mockData = {
        averageCheck: 1355,
        chart: [
          {
            gain: 500,
            order: 2,
            label: '03.10.2018',
          },
          {
            gain: 0,
            order: 0,
            label: '04.10.2018',
          },
          {
            gain: 300,
            order: 1,
            label: '05.10.2018',
          },
          {
            gain: 1500,
            order: 5,
            label: '06.10.2018',
          },
          {
            gain: 400,
            order: 1,
            label: '07.10.2018',
          },
          {
            gain: 0,
            order: 0,
            label: '08.10.2018',
          },
          {
            gain: 900,
            order: 3,
            label: '09.10.2018',
          },
          {
            gain: 855,
            order: 4,
            label: '10.10.2018',
          },
        ]
      }

      /** Вызов отрисовки графиков "Выручка", "Заказы" */
      const gainChartCtx = this.gainChartRef.nativeElement.getContext('2d')
      const orderChartCtx = this.orderChartRef.nativeElement.getContext('2d')

      gainChartCtx.canvas.height = '300px'
      gainChartConfig.labels = mockData.chart.map(item => item.label)
      gainChartConfig.data = mockData.chart.map(item => item.gain)
      orderChartCtx.canvas.height = '300px'
      orderChartConfig.labels = mockData.chart.map(item => item.label)
      orderChartConfig.data = mockData.chart.map(item => item.order)

      new Chart(gainChartCtx, createChartConfig(gainChartConfig))
      new Chart(orderChartCtx, createChartConfig(orderChartConfig))

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

/** Генерация полной конфигурации для графика */
function createChartConfig({labels, label, data, color}) {
  return {
    type: 'line',
    options: {
      response: true
    },
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderColor: color,
        steppedLine: false,
        fill: false
      }]
    }
  }
}
