/** Системные библиотеки */
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {NavigationEnd, Router} from '@angular/router'

/** Сервисы */
import {MaterialInstance, MaterialService} from '../../shared/classes/material.service'
import {OrderService} from './services/order.service'

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

  constructor(
    private router: Router,
    private order: OrderService
  ) {
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('event', event)
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngOnDestroy() {
    this.modalExploreOrder.destroy()
  }

  ngAfterViewInit() {
    this.modalExploreOrder = MaterialService.initModal(this.modalExploreOrderRef)
  }

  openModalExploreOrder() {
    this.modalExploreOrder.open()
  }

  cancelModalExploreOrder() {
    this.modalExploreOrder.close()
  }

  submitModalExploreOrder() {

  }

}
