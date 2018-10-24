/** Системные библиотеки */
import {Injectable} from '@angular/core'

/** Интерфейсы */
import {Position} from '../../../shared/interfaces/position'
import {OrderPosition} from '../../../shared/interfaces/order-position'

@Injectable()

export class OrderService {

  public list: OrderPosition[] = []
  public price = 0

  add(position: Position) {
    const orderPosition: OrderPosition = {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    }
    const candidate = this.list.find(p => p._id === position._id)

    if (candidate) candidate.quantity += orderPosition.quantity
    else this.list.push(orderPosition)

    this.recalculatePrices()
  }

  remove(orderPosition: OrderPosition) {
    const orderPositionIndex = this.list.findIndex(p => p._id === orderPosition._id)

    this.list.splice(orderPositionIndex, 1)
    this.recalculatePrices()
  }

  clear() {

  }

  private recalculatePrices() {
    this.price = this.list.reduce((totalPrice, item) => {
      return totalPrice += item.cost * item.quantity
    }, 0)
  }

}
