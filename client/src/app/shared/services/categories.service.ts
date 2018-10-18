/** */
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

/** */
import {Observable} from 'rxjs'

/** */
import {Category} from '../interfaces/user'


@Injectable({
  providedIn: 'root'
})

export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  // @ts-ignore
  fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/category')
  }

}
