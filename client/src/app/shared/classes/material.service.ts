declare var M

import {ElementRef, Injectable} from '@angular/core'

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

}
