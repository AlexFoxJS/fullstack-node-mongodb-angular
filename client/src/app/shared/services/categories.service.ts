/** */
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

/** */
import {Observable} from 'rxjs'

/** */
import {Category} from '../interfaces/category'


@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category')
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`)
  }

}
