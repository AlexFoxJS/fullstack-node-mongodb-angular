/** Системные библиотеки */
import {Component, OnInit} from '@angular/core'

/** Дочерние библиотеки */
import {Observable} from 'rxjs'

/** Интерфейсы */
import {Category} from '../../../shared/interfaces/category'

/** Сервисы */
import {CategoriesService} from '../../../shared/services/categories.service'

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})

export class OrderCategoriesComponent implements OnInit {

  public categories$: Observable<Category[]>

  constructor(
    private categoriesService: CategoriesService
  ) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetchCategories()
  }

}
