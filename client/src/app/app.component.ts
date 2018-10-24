/** */
import {Component, OnInit} from '@angular/core'
import {Router} from '@angular/router'

/** */
import {AuthService} from './shared/services/auth.service'

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
    <notifier-container></notifier-container>
  `,
})

export class AppComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token')

    if (!!token) {
      this.auth.setToken(token)
      this.router.navigate(['overview'])
    }
  }
}
