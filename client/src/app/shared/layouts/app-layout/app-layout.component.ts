/** Библиотеки - Системные */
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core'
import {Router} from '@angular/router'

/** Сервисы */
import {AuthService} from '../../services/auth.service'
import {MaterialService} from '../../classes/material.service'

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})

export class AppLayoutComponent implements AfterViewInit {

  @ViewChild('materialFloatingButton') materialFloatingButtonRef: ElementRef

  public sidebarNavigationLinks = [
    {url: '/overview', text: 'Обзор'},
    {url: '/analytics', text: 'Аналитика'},
    {url: '/history', text: 'История'},
    {url: '/order', text: 'Добавить заказ'},
    {url: '/categories', text: 'Ассортимент'},
  ]

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngAfterViewInit() {
    MaterialService.initilizeMaterialFloatingButton(this.materialFloatingButtonRef)
  }

  logout(event) {
    event.preventDefault()

    this.auth.logOut()
    this.router.navigate(['/login'])
  }

}
