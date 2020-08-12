import { Component, OnInit, Input, Output } from '@angular/core';
import { CommonService } from '../../service/common.service'
import { BaseRefService } from '../../service/base-ref.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @Input('refcomp') refcomp = {};
  @Input() reftabindex: number;

  settings: any;
  dateformats: string[] = ["dd-MM-yyyy", "MM-dd-yyyy", "yyyy-MM-dd", "dd/MM/yyyy", "MM/dd/yyyy", "yyyy/MM/dd"];
  timezoneData: any[];
  currencyData: any[];
  constructor(private commonService: CommonService, private _baseRef: BaseRefService) {

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this._baseRef.destroy(this.refcomp);
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class. 
    //this.settings = this._baseRef.getNewRefData(this.refcomp, {});
  }

  ngOnInit(): void {
    this.getTimeZone();
    this.getCurrency();
    this.settings = this._baseRef.getData(this.refcomp)
  }

  getTimeZone() {
    this.commonService.getTimeZone({}).subscribe((data: any[]) => {
      this.timezoneData = data;
    });
  }

  getCurrency() {
    this.commonService.getCurrency({}).subscribe((data: any[]) => {
      this.currencyData = data;
    });
  }

}
