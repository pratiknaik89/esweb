import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  pdfSrc:any='';
  constructor() { }

  ngOnInit(): void {
$('body').addClass('sidebar-minimized');
    this.pdfSrc='assets/sdlc.pdf';
  }
  ngOnDestroy(): void {
    $('body').removeClass('sidebar-minimized');
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

}
