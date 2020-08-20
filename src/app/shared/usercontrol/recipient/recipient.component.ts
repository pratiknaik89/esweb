import { Component, OnInit ,Input} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {
 templateList:any=[];
  constructor(private router: Router) { }
  form:any={
    id:0,
    type:'',
    name:'',
    email:'',
    active:'',
    rectype:''
    
  }
  buttons:any=[];
  ngOnInit(): void {
    this.buttons = [
      {
        'id': 'next', 'color': 'white', 'bg': 'success', 'text': 'Next', 'icon': 'arrow-right', 'shortcut': 'ctrl+shift+a',
        'disabled': false, 'access': true
      }
    ];
    this.templateList=[{name:1}]
  }
  addnewTemplate(){
    let data={
      name:2
    }
    this.templateList.push(data);
  }


  buttonClicks(id) {

    switch (id) {
      case 'next':
        this.router.navigate(['/documents/editor']);
        break;
     
      default:
        break;
    }
  }
}
