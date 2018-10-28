/** */
import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'

/** */
import {MaterialInstance, MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-page-history',
  templateUrl: './page-history.component.html',
  styleUrls: ['./page-history.component.css']
})

export class PageHistoryComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('filterTooltip') filterTooltipRef: ElementRef
  public filterTooltip: MaterialInstance
  public isFilterVisible: boolean = false

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.filterTooltip.destroy()
  }

  ngAfterViewInit() {
    this.filterTooltip = MaterialService.initTooltip(this.filterTooltipRef)
  }

}

