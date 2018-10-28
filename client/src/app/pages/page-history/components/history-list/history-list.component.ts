/** */
import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core'

/** */
import {Order} from '../../../../shared/interfaces/order'

/** */
import {MaterialInstance, MaterialService} from '../../../../shared/classes/material.service'

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})

export class HistoryListComponent implements OnDestroy, AfterViewInit {

  @Input() orders: Order[] = []
  @ViewChild('modalOrder') modalOrderRef: ElementRef

  modalOrder: MaterialInstance
  selectedOrder: Order

  ngOnDestroy() {
    this.modalOrder.destroy()
  }

  ngAfterViewInit() {
    this.modalOrder = MaterialService.initModal(this.modalOrderRef)
  }

  /** Подсчет общей суммы заказа */
  computeOrderPrice(order: Order): number {
    return order.list.reduce((total, item): number => {
      return total += item.quantity * item.cost
    }, 0)
  }

  /** */
  selectOrder(order: Order) {
    this.selectedOrder = order
    this.modalOrder.open()
  }

  /** */
  closeModalOrder() {
    this.modalOrder.close()
  }

}
