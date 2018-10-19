/** */
import {Component, OnInit} from '@angular/core'

/** */
import {Observable} from 'rxjs'

/** */
import {CategoriesService} from '../../shared/services/categories.service'

/** */
import {Category} from "../../shared/interfaces/category"

@Component({
  selector: 'app-page-categories',
  templateUrl: './page-categories.component.html',
  styleUrls: ['./page-categories.component.css']
})
export class PageCategoriesComponent implements OnInit {

  public categories$: Observable<Category[]>

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.fetchCategories()
  }

}
