/** Модули - Системные */
import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params} from '@angular/router'

/** Модули - Дочерние */
import {Observable} from 'rxjs'
import {switchMap, map} from 'rxjs/operators'

/** Модули - Сторонние */
import {NotifierService} from 'angular-notifier'

/** Сервисы */
import {PositionsService} from '../../../shared/services/positions.service'
import {OrderService} from '../services/order.service'

/** Интерфейсы */
import {Position} from '../../../shared/interfaces/position'

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

  public positions$: Observable<Position[]>
  private readonly notifier: NotifierService

  constructor(
    private router: ActivatedRoute,
    private positionsService: PositionsService,
    private orderService: OrderService,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService
  }

  ngOnInit() {
    this.positions$ = this.router.params.pipe(
      switchMap(
        (params: Params) => {
          return this.positionsService.fetchPositionsByCategoryId(params.id)
        }
      ),
      map((positions: Position[]) => {
        return positions.map(position => {
          position.quantity = 1
          return position
        })
      })
    )
  }

  addToOrder(position: Position) {
    this.orderService.add(position)
    this.notifier.notify('success', `Позиция "${position.name}" успешно добавлена.`)
  }

}
