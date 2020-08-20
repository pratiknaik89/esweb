import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {
 
  constructor() { }
  form:any={
    id:0,
    type:'',
    name:'',
    email:'',
    active:'',
    rectype:''
    
  }
  ngOnInit(): void {
  }

}
