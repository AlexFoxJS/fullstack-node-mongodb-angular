/** */
import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'

/** */
import {PositionsService} from '../../../../shared/services/positions.service'
import {MaterialInstance, MaterialService} from '../../../../shared/classes/material.service'

/** */
import {Position} from '../../../../shared/interfaces/position'

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string
  @ViewChild('modalCreate') modalCreateRef: ElementRef
  public positions: Position[] = []
  public loading: boolean = false
  public modalCreate: MaterialInstance

  constructor(private positionsService: PositionsService) {
  }

  ngOnInit() {
    this.loading = true
    this.positionsService.fetchPositionsByCategoryId(this.categoryId)
      .subscribe(res => {
        this.positions = res
        this.loading = false
      }, error => {

      })
  }

  ngOnDestroy() {
    this.modalCreate.destroy()
  }

  ngAfterViewInit() {
    this.modalCreate = MaterialService.initModal(this.modalCreateRef)
  }

  openSelectPosition(position: Position) {
    this.modalCreate.open()
  }

  openModalCreatePosition() {
    this.modalCreate.open()
  }

  closeModalCreatePosition() {
    this.modalCreate.close()
  }

}
