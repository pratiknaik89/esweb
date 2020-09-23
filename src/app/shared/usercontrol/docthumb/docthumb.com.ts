import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-docthumb',
    templateUrl: './docthumb.com.html',
    styleUrls: ['./docthumb.com.scss']
})
export class DocThumbComponent implements OnInit {
    @Input('item') item: any = {};
    @Input('menu') menu: any = {}

    @Output() onDelete: EventEmitter<any> = new EventEmitter();
    @Output() onEdit: EventEmitter<any> = new EventEmitter();
    @Output() onMenuItem: EventEmitter<any> = new EventEmitter();

    constructor() { }

    ngOnInit(): void {


    }

    edit(item){
        this.onEdit.emit(item);
    }
    delete(item){
        this.onDelete.emit(item);
    }
}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [DocThumbComponent],
    imports: [ CommonModule ],
    exports: [DocThumbComponent],
    providers: [],
})
export class DocThumbModule {}