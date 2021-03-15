import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LayoutService } from '../../../../../core';

@Component({
  selector: 'app-mixed-widget1',
  templateUrl: './mixed-widget1.component.html',
  outputs :['ChildEvent']
})
export class MixedWidget1Component implements OnInit {

  constructor(private layout: LayoutService) {
   
  }

  ngOnInit(): void {
   
  }

  @Output() sendActiveTab : EventEmitter <number> = new EventEmitter<number>();
  public setActiveTab(tabid: number) {
    this.sendActiveTab.emit(tabid);
  }

}
