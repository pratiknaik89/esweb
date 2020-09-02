import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  documentsDeatilList: any = [];
  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;
  constructor() { }

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Newest First', value: '!year' },
      { label: 'Oldest First', value: 'year' },
      { label: 'Brand', value: 'brand' }
    ];
    this.documentsDeatilList = [
      { id: 1, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 2, name: "Document 2", src: "/assets/img/img2.png" },
      { id: 3, name: "Document 3", src: "" },
      { id: 4, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 5, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 6, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 1, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 2, name: "Document 2", src: "/assets/img/img2.png" },
      { id: 3, name: "Document 3", src: "" },
      { id: 4, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 5, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 6, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 1, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 2, name: "Document 2", src: "/assets/img/img2.png" },
      { id: 3, name: "Document 3", src: "" },
      { id: 4, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 5, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 6, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 1, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 2, name: "Document 2", src: "/assets/img/img2.png" },
      { id: 3, name: "Document 3", src: "" },
      { id: 4, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 5, name: "Document 1", src: "/assets/img/img1.png" },
      { id: 6, name: "Document 1", src: "/assets/img/img1.png" }];
  }

}
