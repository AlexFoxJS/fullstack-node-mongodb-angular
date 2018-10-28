/** Модули - Системные */
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'

/** Модули - Дочерние */
import {Observable} from "rxjs";

/** Сервисы */
import {AnalyticsService} from '../../shared/services/analytics.service'
import {MaterialInstance, MaterialService} from '../../shared/classes/material.service'

/** Интерфейсы */
import {OverviewPage} from '../../shared/interfaces/overview-page'

@Component({
  selector: 'app-page-overview',
  templateUrl: './page-overview.component.html',
  styleUrls: ['./page-overview.component.css']
})

export class PageOverviewComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget') tapTargetRef: ElementRef

  public data$: Observable<OverviewPage>
  public tapTarget: MaterialInstance
  public yesterday: Date = new Date()

  constructor(
    private analyticsService: AnalyticsService
  ) {
  }

  ngOnInit() {
    this.data$ = this.analyticsService.getOverviews()
    this.yesterday.setDate(this.yesterday.getDate() - 1)
  }

  ngOnDestroy() {
    this.tapTarget.destroy()
  }

  ngAfterViewInit() {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }

  /** */
  showInfo() {
    this.tapTarget.open()
  }

}
