/** */
import {Component, OnInit} from '@angular/core'

/** */
import {CategoriesService} from '../../shared/services/categories.service'

/** */
import {Category} from "../../shared/interfaces/user"

@Component({
  selector: 'app-page-categories',
  templateUrl: './page-categories.component.html',
  styleUrls: ['./page-categories.component.css']
})
export class PageCategoriesComponent implements OnInit {

  public categories: Category[] = []
  public categoriesLoading: boolean = false

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categoriesLoading = true
    this.categoriesService.fetchCategories().subscribe(res => {
      this.categories = res
      this.categoriesLoading = false
    })
  }

}
