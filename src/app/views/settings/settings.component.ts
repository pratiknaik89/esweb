import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router, public route: ActivatedRoute,) { }
  items: MenuItem[];
  
  ngOnInit(): void {
    
    if (this.router.url=="/settings") {
      this.router.navigate(['settings/gridconfig'])
     
    }
    this.items = [
      {
          label: 'Grid Config', icon: 'fa fa-fw fa-cog', command: (event) => {
              this.router.navigate(['settings/gridconfig'])
          }
      },
     
     
    
  ];
  }

}
