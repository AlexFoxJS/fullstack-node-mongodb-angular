/** */
import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {FormGroup, FormControl, Validators} from '@angular/forms'

/** */
import {NotifierService} from 'angular-notifier'

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
  @ViewChild('modalCreate') modalRef: ElementRef
  public positions: Position[] = []
  public positionId: String = ''
  public loading: boolean = false
  public modal: MaterialInstance
  public form: FormGroup
  private readonly notifier: NotifierService

  constructor(
    private positionsService: PositionsService,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService
  }

  ngOnInit() {
    this.loading = true
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    })
    this.positionsService.fetchPositionsByCategoryId(this.categoryId)
      .subscribe(res => {
        this.positions = res
        this.loading = false
      }, error => {
        console.error(error.message)
      })
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  openSelectPositionModal({_id, name, cost}: Position): void {
    this.positionId = _id
    this.formPatchValue(name, cost)
    this.modal.open()
  }

  openNewPositionModal(): void {
    this.positionId = ''
    this.formReset()
    this.formPatchValue()
    this.modal.open()
  }

  closeModal(): void {
    this.modal.close()
  }

  onSubmmit(): void {
    const newPosition = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      categoryId: this.categoryId,
    }

    this.form.disable()

    const complete = () => {
      this.modal.close()
      this.formReset()
      this.form.enable()
    }

    if (this.positionId) {
      // @ts-ignore
      newPosition._id = this.positionId
      this.positionsService.updatePosition(newPosition).subscribe(
        position => {
          const positionIndex = this.positions.findIndex(p => p._id === position._id)
          this.positions[positionIndex] = position
          this.notifier.notify('success', 'Позиция успешно отредактированна')
        }, error => {
          this.notifier.notify('error', 'Не удалось отредактировать позицию')
          console.error(error.message)
        }, complete
      )
    } else {
      this.positionsService.createPosition(newPosition).subscribe(
        position => {
          this.notifier.notify('success', 'Позиция успешно создана')
          this.positions.push(position)
        }, error => {
          this.notifier.notify('error', 'Не удалось создать новую позицию')
          console.error(error.message)
        }, complete
      )
    }
  }

  deletePosition(event: Event, position: Position): void {
    const decision = window.confirm(`Подтвердить удаление позиции "${position.name}"`)
    event.stopPropagation()

    if (decision) {
      this.positionsService.deletePosition(position._id).subscribe(
        () => {
          const positionIndex = this.positions.findIndex(p => p._id === position._id)

          this.positions.splice(positionIndex, 1)
          this.notifier.notify('success', `Позиция "${position.name}" успешно удалена`)
        }, error => {
          this.notifier.notify('error', `Не удалось удалить позицию "${position.name}"`)
          console.error(error.message)
        }
      )
    }
  }

  formReset(): void {
    this.form.reset({name: '', cost: 1})
  }

  formPatchValue(name: String = '', cost: Number = 1): void {
    this.form.patchValue({name, cost})
    MaterialService.updateTextInput()
  }

}
