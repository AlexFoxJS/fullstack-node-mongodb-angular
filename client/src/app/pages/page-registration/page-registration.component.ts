/** Модули - Системные */
import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormGroup, FormControl, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {Subscription} from 'rxjs'

/** Модули - Сторонние */
import {NotifierService} from 'angular-notifier'

/** Сервисы */
import {AuthService} from '../../shared/services/auth.service'

@Component({
  selector: 'app-page-registration',
  templateUrl: './page-registration.component.html',
  styleUrls: ['./page-registration.component.css']
})

export class PageRegistrationComponent implements OnInit, OnDestroy {

  public form: FormGroup
  public subscribe: Subscription
  private readonly notifier: NotifierService

  constructor(
    private auth: AuthService,
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
  }

  ngOnDestroy() {
    if (this.subscribe) this.subscribe.unsubscribe()
  }

  onSubmit() {
    this.subscribe = this.auth.registration(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      },
      error => {
        this.notifier.notify('error', 'Ошибка регистрации')
        console.error(error.message)
      }
    )
  }

}
