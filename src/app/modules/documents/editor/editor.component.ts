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
    this.pdfSrc='assets/sdlc.pdf';
  }

}
