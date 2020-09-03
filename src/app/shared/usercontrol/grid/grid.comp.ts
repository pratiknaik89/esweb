import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { GlobalService } from '../../../service/global.service';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ToastService } from '../../../service/toast-service';
import { GridService } from '../../../service/grid.service';
import { Table } from 'primeng/table';
import { AdvanceSearchComponent } from '../advancesearch/advancesearch.comp';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.comp.html',
  styleUrls: ['grid.comp.scss'],
  providers: [GridService]
})
export class GridComponent implements OnInit, AfterViewInit {
  // @Output() onEdit: EventEmitter<any> = new EventEmitter;
  @Output() onAction: EventEmitter<any> = new EventEmitter;
  @Output() OnEditRow: EventEmitter<any> = new EventEmitter;
  @Output() onLinkClick: EventEmitter<any> = new EventEmitter;
  @Input('controlName') controlName: String = '';
  @Input('styles') styles: any = [];

  @Input('api') api: any = '';
  @Input('isAdvanceSearch') isAdvanceSearch: boolean = false;
  @Input('apiFlag') apiFlag: any = 0;
  @Input('params') params: any = 0;
  @Input('actionButtons') actionButtons: any = [];
  @Input('modulename') moduleName: any = '';
  @ViewChild('dataTable') dataTable: Table;
  @ViewChild('template') template;
  @ViewChild('template') popupContainer;
  @ViewChild('advt') advt: AdvanceSearchComponent;

  modalRef: BsModalRef;
  tableProperty: any;
  cols: any = [];
  cols_m: any = [];
  gridData: any = [];
  totalRecords: any = 0;
  selectedColumns: any = [];
  fixedColumns: any = [];
  sortColumn: any = [];
  getTotalRecords: number = 1;
  menuAccess: any = [];
  allowedAction: any = [];
  isLoading = true;
  /** General setting formats */
  dateformat: string = 'dd-mm-yyyy';
  decimalformat: any = 2;
  inputFilter: any = { column_name: '', keyword: '', sign: '=', extra: { search: '=' }, show: true };
  actionWidth: any = 0;
  frozenCols: any = [];
  backColor: number = 0;
  notFixedColLen: number;
  filterFlag: number = 0;
  caseCols: any = {};




  constructor(private global: GlobalService, private modalService: BsModalService, private message: ToastService, private translate: TranslateService, private gridservice: GridService) {
    translate.use(global.getLang());
  }


  ngOnInit(): void {

    // this.menuAccess = this.global.getMenuActions();
    this.cols = this.bindColumns();
    // this.dateformat = this.global.getEnvData().dateformat;
    // this.decimalformat = this.global.getEnvData().decimal;
    // this.actionButtons = this.actionButtons.filter((a) => {
    //   let isrequired = a.isrequired || false; // Not added in menus. used for role module.
    //   if (!isrequired) {
    //     if (this.menuAccess && this.menuAccess != '') {
    //       return this.menuAccess.find((b) => {
    //         return b == a.id;
    //       });
    //     }
    //   }
    //   else {
    //     return a;
    //   }

    // });
    console.log(this.actionButtons);


    this.actionButtons.forEach(a => {
      let d = document.createElement('div');

      $(d).css('display', 'inline-block');
      $(d).attr('id', 'dvirtual_' + a.id);
      $(d).append('<button type="button" id="virtual_' + a.id + '" class="btn btn-' + (a[a.id + '_color'] || a.bg) + '  btn-xs text-' + a.color + ' mr-1"><i class="' + (a[a.id + '_iconi'] || (a.iconi ? a.iconi : 'icon-' + a.icon)) + '"></i><span>' + a.text + '</span></button>');
      $(d).appendTo('body');

      console.log($('#virtual_' + a.id).width())

      this.actionWidth += (this.global.btnStyle === this.global.btnStyleSource.icononly ? 19.33 : parseFloat($('#virtual_' + a.id).innerWidth()) + 5);
      $('#dvirtual_' + a.id).remove()


    });

    // if (this.actionButtons.length == 1) {
    //   this.actionWidth = (this.global.btnStyle === this.global.btnStyleSource.icononly ? 55 : 60);
    // }
    // else {
    this.actionWidth += 45;
    // }


  }

  selectedRow(rows) {
    //this.backColor = rows.id;
    //this.OnEditRow.emit([event,rows]);
  }

  ngAfterViewInit() {
    this.tableProperty = this.dataTable;
    // if (this.global.filterCountry.request.cols > 0) {
    //   this.selectedColumns = this.global.filterCountry.selectedColumns;
    //   this.cols = this.global.filterCountry.cols;
    //   this.sortColumn = this.global.filterCountry.sortColumn;
    //   this.bindGrid(this.global.filterCountry.request);
    // }
  }

  // bindGrid(event) {

  //   try {
  //     this.selectedColumns.sort((a, b) => {
  //       return a.column_order - b.column_order;
  //     });
  //     if (this.cols !== undefined && this.cols.length > 0) {
  //       event.cols = this.buildCols(this.selectedColumns);
  //       event.case = this.caseCols;
  //       event.filters = this.advt.format_filter_data();
  //       if (event.multiSortMeta == null && this.sortColumn.length > 0) {
  //         event.multiSortMeta = this.sortColumn;
  //       }

  //       this.inputFilter.keyword = this.inputFilter.keyword == undefined ? '' : this.inputFilter.keyword.replace(/(^\s*)|(\s*$)/gi, "");

  //       if (this.global.filterGridData.inputFilter.length > 0) {
  //         this.global.filterGridData.inputFilter.find(a => {
  //           //this.inputFilterCol = this.inputFilter.column_name;
  //           if (a.modulename == this.moduleName) {
  //             if (this.filterFlag == 0) {
  //               this.inputFilter.keyword = a.keyword;
  //               this.inputFilterCol = a.column_name;
  //             }
  //           }
  //         });
  //       }


  //       event.inputFilter = { 'column_name': this.inputFilter.column_name, 'keyword': this.inputFilter.keyword == undefined ? '' : this.inputFilter.keyword.replace(/(^\s*)|(\s*$)/gi, ""), 'sign': (this.inputFilter.extra.search || '='), 'modulename': this.moduleName }

  //       for (let i = 0; i < this.global.filterGridData.inputFilter.length; i++) {
  //         const element = this.global.filterGridData.inputFilter[i];
  //         if (element.modulename == this.moduleName) {
  //           this.global.filterGridData.inputFilter.splice(i, 1);
  //           break;
  //         }
  //       }
  //       if (event.inputFilter.keyword != '') {
  //         this.global.filterGridData.inputFilter.push(event.inputFilter);
  //       }

  //       // * usertype(isadmin)
  //       this.gridservice.bindGrid(this.api, {
  //         'type': 'grid',
  //         'filter': event,
  //         'geotype': this.apiFlag,
  //         'getTotalRecordsFlg': this.getTotalRecords,
  //         // 'userid': this.global.getUser().id,
  //         'params': this.params
  //         // ,
  //         // 'usertype': this.global.getUser().isadmin,
  //         // 'isglobal': this.global.getUser().isglobal
  //       }).subscribe((res: any) => {

  //         if (res.resultKey === 1) {
  //           //
  //           this.gridData = res.resultValue[0];
  //           if (this.getTotalRecords === 1) {
  //             this.totalRecords = res.resultValue[1];
  //           }
  //           this.getTotalRecords = 0;
  //         }
  //         else if (res.resultKey === 0) {
  //           this.message.show('error', res.defaultError, 'error', this.translate)
  //         }
  //       }, (error: any) => {
  //         this.message.showTranslate('error', error, 'error', this.translate);
  //       }, () => {
  //         this.isLoading = false;
  //       });
  //     }
  //   }
  //   catch (Ex) {
  //     this.message.show('error', Ex, 'error', this.translate);
  //   }
  // }
  bindGrid(event) {
    try {
      this.selectedColumns.sort((a, b) => {
        return a.column_order - b.column_order;
      });
      if (this.cols !== undefined && this.cols.length > 0) {
        event.cols = this.buildCols(this.selectedColumns);
        console.log(event.cols);
        event.case = this.caseCols;
        event.filters = this.advt.format_filter_data();

        if (event.multiSortMeta == null && this.sortColumn.length > 0) {
          event.multiSortMeta = this.sortColumn;
        }

        //CHINMAY CODE 
        // if keyword contacins ' then replaced it. and stored into "trimmedKeyword"

        let trimmedKeyword = this.inputFilter.keyword;
        if (this.inputFilter.keyword != undefined) {
          trimmedKeyword = this.inputFilter.keyword.replace(/'/g, "\\'");
        }

        //END CHINMAY CODE

        event.masterid = this.global.getDisp();
        event.inputFilter = {
          'column_name': this.inputFilter.column_name,
          'keyword': trimmedKeyword,


          'sign': (this.inputFilter.extra.search || '=')
        }
        // * usertype(isadmin)
        this.gridservice.bindGrid(this.api, {
          'operate': 'grid',
          'filter': event,
          'geotype': this.apiFlag,
          'getTotalRecordsFlg': this.getTotalRecords,
          'userid': this.global.getUser().id,
          'params': this.params
          // ,
          // 'usertype': this.global.getUser().isadmin,
          // 'isglobal': this.global.getUser().isglobal
        }).subscribe((res: any) => {

          if (res.resultKey === 1) {
            this.gridData = res.resultValue[0];
            if (this.getTotalRecords === 1) {
              this.totalRecords = res.resultValue[1];
            }
            this.getTotalRecords = 0;
          }
          else if (res.resultKey === 0) {
            this.message.show('error', res.defaultError, 'error', this.translate)
          }
        }, (error: any) => {
          this.message.show('error', 'No records avaliable', 'error', this.translate);
        }, () => {
          this.isLoading = false;
        });
      }
    }
    catch (Ex) {
      this.message.show('error', Ex, 'error', this.translate);
    }
  }

  getDataOnSelectedColumns() {
    this.getTotalRecords = 0;
    this.tableProperty.first = 0;
    let request = {
      first: this.tableProperty.first,
      rows: this.tableProperty.rows,
      cols: this.buildCols(this.selectedColumns),
      case: this.caseCols,
      sortField: this.tableProperty.sortField,
      sortOrder: this.tableProperty.sortOrder,
      filters: this.advt.format_filter_data(),
    };

    this.bindGrid(request);
  }

  buildCols(cols) {
    let column = [];
    let fixedcolumns = [];
    let finalcolumn = [];
    column = cols.map((a) => {
      if (a.extra && a.extra.case) {
        this.caseCols[a.column_name] = a.extra.case;
      }
      return a.column_name;
    });
    fixedcolumns = this.fixedColumns.map((a) => {
      return a.column_name;
    });
    finalcolumn = column.concat(fixedcolumns);
    this.notFixedColLen = column.length;
    return JSON.stringify(finalcolumn);
  }

  buildColsForExport(cols) {
    let column = [];
    let fixedcolumns = [];
    let finalcolumn = [];
    column = cols.map((a) => {
      return a.column_name;
    });
    finalcolumn = column;
    return JSON.stringify(finalcolumn);
  }

  buildColsLabel(): any {
    let colname = '';
    for (let a of this.cols) {
      colname += '"' + a.column_name + '":"' + a.column_label + '",';
    }
    return '{' + colname.substring(0, colname.length - 1) + '}';
  }
  inputFilterArr = [];
  inputFilterCol = '';

  bindColumns() {
    try {
      this.gridservice.getColumns({
        'module': this.controlName
      }).subscribe((res: any) => {
        if (res.resultKey === 1) {
          let fixedColumns = [];
          let sortColumn = undefined;

          this.cols_m = res.resultValue;

          this.cols = [];
          // this.cols = res.resultValue.filter((a) => {
          //     return a.ishidden === 0;
          // });

          // this.selectedColumns = res.resultValue.filter((a) => {
          //     return a.defaultselected === 1 && a.ishidden === 0;
          // });


          // sortColumn = res.resultValue.filter((a) => {

          //     if( a.issort){

          //     }

          //     return a.issort === 1;
          // });
          for (let index = 0; index < res.resultValue.length; index++) {
            const el = res.resultValue[index];
            // check fixed selected
            if (el.fixedSelected == 1) {
              fixedColumns.push(el);
            }
            // check selected columns
            if (el.defaultselected === 1 && el.ishidden === 0) {
              this.selectedColumns.push(el);
            }

            // check hidden column
            if (el.ishidden === 0) {
              this.cols.push(el);
            }

            // add sort column
            if (el.issort) {
              try {
                this.sortColumn.push(
                  {
                    'field': el.column_name, 'order': (el.extra.sort[1] == 'ASC' ? -1 : 1),
                    'seq': el.extra.sort[0]
                  });
              } catch (error) {

              }

            }
          }
          this.inputFilterArr = res.resultValue.filter((a) => {
            return a.isfilter === 1;
          });
          // order by column
          //console.log(this.inputFilterArr);
          this.cols.sort((a, b) => {
            return a.column_order - b.column_order;
          });
          if (this.sortColumn) {
            this.sortColumn.sort((a, b) => {
              return a.seq - b.seq;
            });
          }


          // fixedColumns = res.resultValue.filter((a) => {
          //     return a.fixedSelected === 1;
          // });


          if (fixedColumns.length > 0) {
            this.fixedColumns = fixedColumns;
          }
          else {
            this.message.show('error', 'Fixed column for grid is missing', 'error', this.translate);
          }

          // if (sortColumn.length > 0) {
          //     this.sortColumn = sortColumn[0].column_name;
          // }
          // else {
          //     this.sortColumn = 'id';
          // }




          if (this.inputFilterArr.length > 0) {
            this.inputFilter = this.inputFilterArr[0];
            this.inputFilterCol = this.inputFilter.column_name;
            this.inputFilter.show = true;
          }
          else {
            this.inputFilter.show = false;
          }


          // this.frozenCols.push(res.resultValue.find((a) => {
          //     return a.column_name == 'id';
          // }));
          //this.frozenCols.push({field:'action',header:'Action'});
          this.dataTable.reset();

        }
      }, (err) => {
        this.message.show('error', err, 'error', this.translate);
      });
    } catch (error) {
      this.message.show('error', error, 'error', this.translate);
    }
  }

  onFilterColChange(event) {
    this.inputFilter = this.inputFilterArr.find((a) => {
      return a.column_name == event.target.value;
    });
    this.inputFilter.show = true;
  }

  onAdvanceSearch(event) {
    this.getTotalRecords = 1;
    this.tableProperty.first = 0;
    let request = {
      first: this.tableProperty.first,
      rows: this.tableProperty.rows,
      cols: this.buildCols(this.selectedColumns),
      sortField: this.tableProperty.sortField,
      sortOrder: this.tableProperty.sortOrder,
      filters: event
    };
    this.bindGrid(request);
    this.advt.closeModal();
  }

  openModal(content: string) {
    this.modalRef = this.modalService.show(this.popupContainer);
  }

  export() {
    try {
      this.global.changeLoaderText('Loading');
      this.global.showLoader();
      this.tableProperty.first = 0;
      let request = {
        first: this.tableProperty.first,
        rows: this.tableProperty.rows,
        cols: this.buildColsForExport(this.cols),
        colsLabel: this.buildColsLabel(),
        sortField: this.tableProperty.sortField,
        sortOrder: this.tableProperty.sortOrder
      };
      this.gridservice.export(this.api, {
        'type': 'export',
        'filter': request,
        'geotype': this.apiFlag,
        // 'userid': this.global.getUser().id
        // ,
        // 'usertype': this.global.getUser().isadmin,
        // 'isglobal': this.global.getUser().isglobal
      }).subscribe((res: any) => {
        if (res.resultKey === 1) {
          //window.location.href = res.resultValue;
          let win = window.open(res.resultValue, '_blank');
          win.focus();
        } else if (res.resultKey === 0) {
          this.message.show('error', res.defaultError, 'error', this.translate)
        }
      }, (error: any) => {
        this.message.show('error', error, 'error', this.translate);
      })
    } catch (error) {
      this.message.show('error', error, 'error', this.translate);
    }
  }

  _onAction(act, data) {
    this.onAction.emit([act, data]);
  }

  oncreate(a, rowData) {
    if (a.oncreate) {
      a.oncreate(a, rowData);
    }
  }

  onInputFilter() {
    this.getTotalRecords = 1;
    this.tableProperty.first = 0;
    this.filterFlag = 1;
    let request = {
      first: this.tableProperty.first,
      rows: this.tableProperty.rows,
      cols: this.buildCols(this.selectedColumns),
      sortField: this.tableProperty.sortField,
      sortOrder: this.tableProperty.sortOrder,
    };
    if (this.notFixedColLen == 0) {
      this.message.showTranslate('error', 'min_col_in_grid', 'error', this.translate);
      return false;
    }
    this.bindGrid(request);
  }

  clearfilter() {
    this.inputFilter.keyword = '';
    this.advt.clearfilter();
  }

  openWindow(columnName, data) {
    // switch (columnName) {
    //   case 'ndadoc': window.open(this.global.getConfig().document_path + "/" + data[columnName], "_blank", "");
    //     break;
    //   case 'sequenceid': this.onLinkClick.emit([columnName, data]);
    //     break;
    // }
  }

  deleteRow(data) {
    this.totalRecords = this.totalRecords - 1;
  }

  insert(data) {
    data.isnew = true;
    // if (anywhere) {
    //     this.gridData.push(data);
    // } else {
    this.gridData.unshift(data);

    //}
    this.totalRecords += 1;
  }
  public RefreshGrid() {
    this.getTotalRecords = 1;
    this.tableProperty.first = 0;
    let request = {
      first: this.tableProperty.first,
      rows: this.tableProperty.rows,
      cols: this.buildCols(this.selectedColumns),
      case: this.caseCols,
      sortField: this.tableProperty.sortField,
      sortOrder: this.tableProperty.sortOrder,
      filters: this.advt.format_filter_data(),
    };
    this.bindGrid(request);
  }
}
