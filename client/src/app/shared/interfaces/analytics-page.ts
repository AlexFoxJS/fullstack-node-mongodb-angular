/** Интерфейсы */
import {AnalyticsChartItem} from './analytics-chart-item'

export interface AnalyticsPage {
  averageCheck: number,
  chart: AnalyticsChartItem[]
}
