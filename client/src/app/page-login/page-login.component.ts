/** Библиотеки - Системные */
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {Subscription} from 'rxjs'

/** Библиотеки - Сторонние */
import {NotifierService} from 'angular-notifier'

/** Сервисы */
import {AuthService} from '../shared/services/auth.service'

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit, OnDestroy {

  public form: FormGroup
  public subscribe: Subscription
  private readonly notifier: NotifierService

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
  ) {
    this.notifier = notifierService
  }

  ngOnInit() {

    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registration']) {
        this.notifier.notify('success', 'Успешная регистрация')
      } else if (params['accessDenied']) {
        this.notifier.notify('error', 'Ошибка авторизации')
      } else if (params['tokenExpired']) {
        this.notifier.notify('warning', 'Срок действия токена истек, необходима повторная авторизация')
      }
    })

  }

  ngOnDestroy() {
    if (this.subscribe) this.subscribe.unsubscribe()
  }

  onSubmit() {
    this.form.disable()

    this.subscribe = this.auth.login(this.form.value).subscribe(
      () => {
        this.notifier.notify('success', 'Успешная авторизация')
        this.router.navigate(['/overview'])
      },
      () => {
        this.notifier.notify('error', 'Ошибка авторизации')
        this.form.enable()
      }
    )

  }

}
