import {ElementRef, Injectable} from '@angular/core'
import {MaterialDatepicker} from "../interfaces/material-datepicker";

declare var M

export interface MaterialInstance {
  open?(): void,
  close?(): void,
  destroy?(): void,
}

@Injectable({
  providedIn: 'root'
})

export class MaterialService {

  /** */
  static initilizeMaterialFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  /** */
  static updateTextInput() {
    M.updateTextFields()
  }

  /** */
  static initModal(ref: ElementRef) {
    return M.Modal.init(ref.nativeElement)
  }

  /** */
  static initTooltip(ref: ElementRef) {
    return M.Tooltip.init(ref.nativeElement)
  }

  /** */
  static initDatepicker(ref: ElementRef, onClose: () => void): MaterialDatepicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose,
      // i18n: {
      //   monthsShort: [
      //     'янв',
      //     'фев',
      //     'мар',
      //     'апр',
      //     'май',
      //     'июн',
      //     'июл',
      //     'авг',
      //     'сен',
      //     'окт',
      //     'ноя',
      //     'дек'
      //   ],
      //   weekdaysShort: [
      //     'Вс',
      //     'Пн',
      //     'Вт',
      //     'Ср',
      //     'Чт',
      //     'Пт',
      //     'Сб'
      //   ]
      // }
    })
  }

}
