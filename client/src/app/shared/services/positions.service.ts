/** */
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'

/** */
import {Observable} from 'rxjs'

/** */
import {Position} from '../interfaces/position'

@Injectable({
  providedIn: 'root'
})

export class PositionsService {

  constructor(private http: HttpClient) {
  }

  fetchPositionsByCategoryId(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`)
  }

}
