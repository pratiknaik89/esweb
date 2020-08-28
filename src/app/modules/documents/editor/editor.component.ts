import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../../../service/template.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  sub: Subscription;
  pdfSrc: any = '';
  recipients: string[] = ["All", "Doctor", "Patients"];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private template: TemplateService) { }

  ngOnInit(): void {
    $('body').addClass('sidebar-minimized');
    this.pdfSrc = './assets/sdlc.pdf';

    this.sub = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        console.log(params);
        this.template.getS3TempObjectUrl({
          operate: 'get',
          filepath: params.filepath,
          filename: params.filepath.substring(params.filepath.lastIndexOf("/") + 1)
        }).subscribe((data: any) => {
          if (data.resultKey == 1) {
            console.log(data.resultValue);
            this.pdfSrc = data.resultValue;
          }
        });
      });

  }
  ngOnDestroy(): void {
    $('body').removeClass('sidebar-minimized');

    this.sub.unsubscribe();
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }


}
