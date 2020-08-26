import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rec-control',
  templateUrl: './rec-control.comp.html',
  styleUrls: ['./rec-control.comp.css']
})
export class RecControlComponent implements OnInit {
  templateList: any = [];
  constructor(private router: Router) { }
  form: any = {
    id: 'doc',
    type: '',
    name: '',
    email: '',
    active: '',
    rectype: ''

  }
  buttons: any = [];
  ngOnInit(): void {

  }

}
