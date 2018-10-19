/** Библиотеки - Системные */
import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params} from '@angular/router'
import {FormControl, FormGroup, Validators} from '@angular/forms'

/** Библиотеки - Дочерние */
import {switchMap} from 'rxjs/operators'
import {of} from 'rxjs'

/** Библиотеки - Сторонние */
import {NotifierService} from 'angular-notifier'

/** Сервисы */
import {CategoriesService} from '../../../../shared/services/categories.service'

/** Классы */
import {MaterialService} from '../../../../shared/classes/material.service'

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  public form: FormGroup
  public isNew: boolean = true
  private readonly notifier: NotifierService

  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService
  }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.form.disable()

    // this.route.params.subscribe((params: Params) => {
    //   if (params.id) {
    //     // Редактирование
    //     this.isNew = false
    //   } else {
    //     // Создание
    //   }
    // })

    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if (params.id) {
            this.isNew = false
            return this.categoriesService.getCategoryById(params.id)
          }

          return of(null)
        }
      )
    )
      .subscribe(
        res => {
          if (res) {
            this.form.patchValue({
              name: res.name
            })
            MaterialService.updateTextInput()
          }
          this.form.enable()
        },
        error => {
          this.notifier.notify('error', error.error.message)
        }
      )

  }

  onSubmit() {

  }

}
