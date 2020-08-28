import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TemplateService } from '../../../service/template.service'
@Component({
  selector: 'app-recipient',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {
  templateList: any = [];
  constructor(private route: ActivatedRoute, private router: Router, private template: TemplateService) { }
  form: any = {
    id: 0,
    type: '',
    name: '',
    email: '',
    active: '',
    rectype: ''

  }
  buttons: any = [];
  ngOnInit(): void {
    this.buttons = [
      {
        'id': 'next', 'color': 'white', 'bg': 'success', 'text': 'Next', 'icon': 'arrow-right', 'shortcut': 'ctrl+shift+a',
        'disabled': false, 'access': true
      }
    ];
    this.templateList = [{ name: 1 }]

    this.getTemplateById(this.route.snapshot.paramMap.get('id'));
    // this.route
    //   .queryParams
    //   .subscribe(params => {
    //     // Defaults to 0 if no query param provided.
    //     console.log(params);

    //   });

  }
  addnewTemplate() {
    let data = {
      name: 2
    }
    this.templateList.push(data);
  }

  getTemplateById(id) {
    this.template.getTemplateById({
      operate: 'get',
      id: id
    }).subscribe((data: any) => {
      if (data.resultKey == 1) {
        console.log(data.resultValue);
      }
    });
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
