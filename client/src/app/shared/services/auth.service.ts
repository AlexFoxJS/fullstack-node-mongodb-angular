/** Библиотеки */
import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'

/** Интерфейсы */
import {User} from '../interfaces/user'

/** Регистрируем провайдер в приложении */
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private token = null

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(
        tap(({token}) => {
          localStorage.setItem('token', token)
          this.setToken(token)
        })
      )
  }

  registration(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

  setToken(token: string): void {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAutenticated(): boolean {
    return !!this.token
  }

  logOut(): void {
    this.setToken(null)
    localStorage.clear()
  }

}
