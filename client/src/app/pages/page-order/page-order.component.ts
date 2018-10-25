/** Системные библиотеки */
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {NavigationEnd, Router} from '@angular/router'

/** */
import {Subscription} from 'rxjs'

/** */
import {NotifierService} from 'angular-notifier'

/** Сервисы */
import {MaterialInstance, MaterialService} from '../../shared/classes/material.service'
import {OrderService} from './services/order.service'

/** Интерфейсы */
import {OrderPosition} from '../../shared/interfaces/order-position'
import {OrdersService} from '../../shared/services/orders.service'
import {Order} from '../../shared/interfaces/order'

@Component({
  selector: 'app-page-order',
  templateUrl: './page-order.component.html',
  styleUrls: ['./page-order.component.css'],
  providers: [OrderService]
})

export class PageOrderComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modalExploreOrder') modalExploreOrderRef: ElementRef

  public modalExploreOrder: MaterialInstance
  public isRoot: boolean
  public pending = false
  public subscribeCreateOrder: Subscription
  private readonly notifier: NotifierService

  constructor(
    public order: OrderService,
    private router: Router,
    private ordersService: OrdersService,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngOnDestroy() {
    this.modalExploreOrder.destroy()

    if (this.subscribeCreateOrder) {
      this.subscribeCreateOrder.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.modalExploreOrder = MaterialService.initModal(this.modalExploreOrderRef)
  }

  /** */
  openModalExploreOrder() {
    this.modalExploreOrder.open()
  }

  /** */
  cancelModalExploreOrder() {
    this.closeModalExploreOrder()
  }

  /** */
  closeModalExploreOrder() {
    this.modalExploreOrder.close()
  }

  /** */
  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }

  /** */
  submitModalExploreOrder() {
    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id
        return item
      })
    }

    this.pending = true

    this.subscribeCreateOrder = this.ordersService.create(order).subscribe(
      newOrder => {
        this.notifier.notify('success', `Заказ №${newOrder.order} был добавлен.`)
        this.order.clear()
      },
      error => {
        this.notifier.notify('error', `${error.error.message}`)
      },
      () => {
        this.closeModalExploreOrder()
        this.pending = false
      }
    )

  }

}
