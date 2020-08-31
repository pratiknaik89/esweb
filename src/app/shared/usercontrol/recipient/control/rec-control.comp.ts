import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ClsRecipient, ClsRecipientType } from '../../../../model/cls-recipient-model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-rec-control',
  templateUrl: './rec-control.comp.html',
  styleUrls: ['./rec-control.comp.css']
})
export class RecControlComponent implements OnInit {

  @Input() recipient: ClsRecipient;
  @Input() rectype: Array<ClsRecipientType>;
  @Input() f: NgForm;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

  }
}
