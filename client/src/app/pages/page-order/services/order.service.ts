/** Системные библиотеки */
import {Injectable} from '@angular/core'

/** Интерфейсы */
import {Position} from '../../../shared/interfaces/position'

@Injectable()

export class OrderService {

  add(position: Position) {
    console.log(position)
  }

  remove(position: Position) {

  }

  clear() {

  }

}
