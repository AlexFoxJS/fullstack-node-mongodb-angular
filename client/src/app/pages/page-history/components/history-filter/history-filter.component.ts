/** Модули - Системные */
import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild} from '@angular/core'

/** Сервисы */
import {MaterialService} from '../../../../shared/classes/material.service'

/** Интерфейсы */
import {Filter} from '../../../../shared/interfaces/filter'
import {MaterialDatepicker} from "../../../../shared/interfaces/material-datepicker";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css']
})

export class HistoryFilterComponent implements OnDestroy, AfterViewInit {

  @Output() onFilter = new EventEmitter<Filter>()
  @ViewChild('orderStartField') orderStartFieldRef: ElementRef
  @ViewChild('orderEndField') orderEndFieldRef: ElementRef

  public order: number
  public orderStartField: MaterialDatepicker
  public orderEndField: MaterialDatepicker
  public isValid: boolean = true

  ngOnDestroy() {
    this.orderStartField.destroy()
    this.orderEndField.destroy()
  }

  ngAfterViewInit() {
    this.orderStartField = MaterialService.initDatepicker(this.orderStartFieldRef, this.dateValidate.bind(this))
    this.orderEndField = MaterialService.initDatepicker(this.orderEndFieldRef, this.dateValidate.bind(this))
  }

  /** Пробрасываем родителю данные для фильтрации заказов */
  submitFilter() {
    const filter: Filter = {}

    if (this.order) filter.order = this.order
    if (this.orderStartField.date) filter.start = this.orderStartField.date
    if (this.orderEndField.date) filter.end = this.orderEndField.date

    this.onFilter.emit(filter)
  }

  /** Валидация даты */
  dateValidate() {
    if (!this.orderStartField || !this.orderEndField) {
      this.isValid = true
      return
    }

    if (this.orderStartField.date && this.orderEndField.date) {
      this.isValid = this.orderStartField.date < this.orderEndField.date
    }
  }

}
