import {ElementRef, Injectable} from '@angular/core'

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

  static initilizeMaterialFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextInput() {
    M.updateTextFields()
  }

  static initModal(ref: ElementRef) {
    return M.Modal.init(ref.nativeElement)
  }

}
