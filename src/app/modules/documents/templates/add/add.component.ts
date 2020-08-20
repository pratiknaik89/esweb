import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  pdfSrc:any='';
  upload_url:any='';
  constructor() { }
form:any={
  id:0,
  type:'',
  name:'',
  email:'',
  active:''
  
}
  ngOnInit(): void {
    this.pdfSrc='assets/sdlc.pdf';
  }

}
