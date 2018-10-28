/** Модули - Системные */
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'

/** Модули - Дочерние */
import {Subscription} from 'rxjs'

/** Модули - Сторонние */
import {NotifierService} from 'angular-notifier'

/**  */
import {MaterialInstance, MaterialService} from '../../shared/classes/material.service'

/** */
import {OrdersService} from '../../shared/services/orders.service'

/** */
import {Order} from '../../shared/interfaces/order'

/** Интерфесы */
import {Filter} from '../../shared/interfaces/filter'

/** Константы */
// TODO: Вынести в отдельный файл
const FILTER_STEP = 2

@Component({
  selector: 'app-page-history',
  templateUrl: './page-history.component.html',
  styleUrls: ['./page-history.component.css']
})

export class PageHistoryComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('filterTooltip') filterTooltipRef: ElementRef

  public filterTooltip: MaterialInstance
  public isFilterVisible: boolean = false
  public subscription: Subscription
  public offset: number = 0
  public limit: number = FILTER_STEP
  public orders: Order[] = []
  public loading: boolean = false
  public reloading: boolean = false
  public noMoreOrders: boolean = false
  public filterOptions: object = {}

  private readonly notifier: NotifierService

  constructor(
    private ordersService: OrdersService,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService
  }

  ngOnInit() {
    this.reloading = true
    this.fetchOrders()
  }

  ngOnDestroy() {
    this.filterTooltip.destroy()
    this.subscription.unsubscribe()
  }

  ngAfterViewInit() {
    this.filterTooltip = MaterialService.initTooltip(this.filterTooltipRef)
  }

  /** Метод получения списка заказов */
  private fetchOrders() {
    const params = {
      ...this.filterOptions,
      offset: this.offset,
      limit: this.limit,
    }

    this.subscription = this.ordersService.fetch(params).subscribe(
      orders => {
        this.orders = this.orders.concat(orders)
        this.noMoreOrders = FILTER_STEP > orders.length
      },
      error => {
        this.notifier.notify('error', `${error.error.message}`)
      },
      () => {
        this.loading = false
        this.reloading = false
      }
    )
  }

  /** Метод получения дополнительных заказов */
  loadMoreOrders() {
    this.offset += FILTER_STEP
    this.fetchOrders()
    this.loading = true
  }

  /** Применям фильтрация заказов */
  applyFilter(filter: Filter) {
    this.orders = []
    this.offset = 0
    this.filterOptions = filter
    this.reloading = true
    this.fetchOrders()
  }

  /** */
  isFiltered(): boolean {
    return Object.keys(this.filterOptions).length !== 0
  }

}

