/** Библиотеки - Системные */
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {ActivatedRoute, Params, Router} from '@angular/router'
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

/** Интерфейс */
import {Category} from '../../../../shared/interfaces/category'

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  public form: FormGroup
  public isNew: boolean = true
  public image: File
  public imagePreview: string = ''
  public category: Category
  private readonly notifier: NotifierService

  @ViewChild('inputFile') inputFile: ElementRef

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService
  }

  /** */
  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    this.form.disable()

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
      (res: Category) => {
        if (res) {
          this.category = res
          this.form.patchValue({
            name: res.name
          })
          this.imagePreview = res.imageURL
          MaterialService.updateTextInput()
        }

        this.form.enable()
      },
      error => {
        this.notifier.notify('error', error.message)
      }
    )

  }

  /** */
  deleteCategory() {
    const desigion = window.confirm(`Вы уверены что хотите удалить категорию "${this.category.name}"`)

    if (desigion) {
      this.categoriesService.deleteCategory(this.category._id)
        .subscribe(
          () => this.notifier.notify('success', `Категория "${this.category.name}" успешно удалена`),
          () => this.notifier.notify('error', `Ошибка при удалении категории "${this.category.name}"`),
          () => this.router.navigate(['/categories'])
        )
    }
  }

  /** */
  triggerInputFileClick() {
    this.inputFile.nativeElement.click()
  }

  /** */
  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  /** */
  onSubmit() {
    let formSubmitSubscribe$
    this.form.disable()

    if (this.isNew) {
      formSubmitSubscribe$ = this.categoriesService.createCategory(this.form.value.name, this.image)
    } else {
      formSubmitSubscribe$ = this.categoriesService.updateCategory(this.category._id, this.form.value.name, this.image)
    }

    formSubmitSubscribe$.subscribe(res => {
      this.category = res
      this.notifier.notify('success', 'Данные успешно отправлены')
      this.form.enable()
    }, error => {
      this.notifier.notify('error', 'Ошибка при отправке формы')
      console.error(error.message)
      this.form.enable()
    })
  }

}
