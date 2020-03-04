import { Component, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ControlService } from '../../services/control.service';
import 'rxjs/add/observable/of';
import { Router, RouterModule } from '@angular/router'
import { BehaviorSubject } from 'rxjs';
import 'rxjs/Rx';
import { MatPaginator, PageEvent, MatSort } from '@angular/material';
import 'rxjs/add/operator/startWith';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';

//import { Observable } from 'rxjs/Observable';
/**
 * @title Basic table
 */
@Component({
    providers: [DatePipe],
    selector: 'table-component',
    styleUrls: ['table.component.css'],
    templateUrl: 'table.component.html',
})
export class TableComponent {
    public displayedColumns = [];
    //dataSource = new ExampleDataSource(this._controlService, this.router);
    dataSource: ExampleDataSource;
    filteredDataSource: ExampleDataSource;
    public columnsContainer = [];
    //dataSource = DataSource;
    public pathUrl = "";
    public editMode = false;
    public pagination2 = false;
    public editModePath = "";
    public showBar = false;
    public pathFind = "";
    public PageNumber = 0;
    public PageSize = 10;
    public showPaginator = true;
    public showFilter = true;
    public textFilter = "registers";
    public param = "";
    public paramsFind = "";
    public selectedRowIndex: number = -1;
    public isSelected = true;
    public tableData = [];

    public filterData = [];
    public searchKeywords = '';
    public filteredData = [];
    public row = '';
    public numPerPageOpts = [5, 10, 25, 50, 100];
    public numPerPage = this.numPerPageOpts[1];
    public currentPage = 0;
    public length = 50;

    public anchorColumns = []; 
    @ViewChild('filter')
    public filter: ElementRef;

    @ViewChild(MatPaginator)
    public paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    pageEvent: PageEvent;

    @Output()
    rowEmit: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Output()
    buttonRowEmit: EventEmitter<any[]> = new EventEmitter<any[]>();
    public widthCell = "auto";
  
    constructor(public _controlService: ControlService, public snackBar: MatSnackBar, public datePipe: DatePipe) {
        
    }
    public setDisplayedColumns(display: any[]) {
      this.displayedColumns = display;
      for (var i = 0; i < this.displayedColumns.length; i++) {
        this.anchorColumns.push("auto");
      }
    }
    public setColumnsContainer(columns: any[]) {
        this.columnsContainer = columns;
        //this.dataSource.com
    }
    public cmpButton(type: string): boolean {
      if (type === 'button') {
        return true;
      } else {
        return false;
      }
    }

    public cmpCheckBox(type: string): boolean {
      if (type === 'check') {
        return true;
      } else {
        return false;
      }
    }

    public check(event, row) {
      this.dataSource.data[row]["checked"] = event.checked;
    }

    // Functions of table
    public initialPagination(page) {
      var start = (page - 1) * this.numPerPage,
        end = start + this.numPerPage;

      var data = this.tableData;
      this.filterData = data.slice(start, end);
      //this.filteredDataSource.data.splice(0, this.numPerPage);
      //this.filteredDataSource.setData(this.filterData);
      this.dataSource.setData([]);
      this.initDatasource();
      this.dataSource.setData(this.filterData);

      this.length = data.length;

      /*if (this.showFilter) {
            this.loadControl();
          }*/
    };

    public initDatasource() {
        this.dataSource = new ExampleDataSource(this._controlService, this.displayedColumns, this.paginator, this.showFilter, this.showPaginator);
        this.filteredDataSource = new ExampleDataSource(this._controlService, this.displayedColumns, this.paginator, this.showFilter, this.showPaginator);
        this.dataSource._paginator = this.paginator;
    }
    public loadControl() {
        var me = this;
        
           Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(200)
            .subscribe((event: KeyboardEvent) => {
                if (event['keyCode'] === 13) {
                    me.param = me.filter.nativeElement.value;
                    me.PageNumber = 1;
                    me.paginator.pageIndex = 0;
                } else {
                    if (!me.dataSource) {
                        return;
                    }
                    me.dataSource.filter = me.filter.nativeElement.value;
                }                
            });
    }
    public _pageEvent(event: PageEvent) {
        this.numPerPage = event.pageSize;
        this.PageNumber = event.pageIndex + 1;
        this.dataSource._paginator = this.paginator;
        this.initialPagination(this.PageNumber);
    /* if (this.pagination2) {
          this.fetchItems3("");
        }else{
          this.fetchItems2(this.param);
        }*/

    }

    ngOnInit() {
      var me = this;
    }
 
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

    //Opciones de comparacion
    public cmpNormal(column): boolean {
        if (column.type) {
            if (column.type === "normal") return true;
            else return false;
        } else {
            return true;
        }
    }
    public cmpEmit(column): boolean {
        if (column.type) {
            if (column.type === "emit") return true;
            else return false;
        } else {
            return false;
        }
    }
    public emitRow(row, column, index) {
        //console.log(row);
        var emit = [];
        emit.push(row);
        emit.push(column);
        emit.push(index);
        this.rowEmit.emit(emit);
    }

    //function resize
    /*public resizeColumn(event, column, indexColumn) {
      var nodes = event.target.offsetParent.parentNode.parentNode.childNodes;
      var width = event.target.offsetParent.offsetWidth;      
      var me = this;
      drag(event, {
        move: (moveEvent: MouseEvent, dx: number) =>{
          width = width + dx;
          for (var i = 0; i < nodes.length;i++){
            if (nodes[i].nodeName === "Mat-ROW") {
              var childs = nodes[i].childNodes;
              childs[indexColumn + 1].style.minWidth = width + "px";
              childs[indexColumn + 1].style.maxWidth = width + "px";
            }
          }          
          event.target.offsetParent.style.minWidth = width + "px";
          event.target.offsetParent.style.maxWidth = width + "px";          
        },
      });
    }*/
}


export class ExampleDataSource extends DataSource<any> {

    public totalData = [];
    //Filter
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }
    //public data = [];
    dataChange: BehaviorSubject<Response[]> = new BehaviorSubject<Response[]>([]);    
    get data(): Response[] {
        return this.dataChange.value;
    }
    constructor(public _controlService: ControlService, public columns: string[], public _paginator: MatPaginator, public showFilter: boolean, public showPaginator: boolean) {
        super();
    }
    public setData(data: any[]) {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                const copiedData = this.data.slice();
                copiedData.push(data[i]);
                this.dataChange.next(copiedData);
            }
        }
        
    }
    connect(): Observable<Response[]> {
        if (this.showFilter) {
            const displayDataChanges = [
                this.dataChange,
                this._filterChange,
                //this._paginator.page
            ];
            return merge(...displayDataChanges).map(() => {
                return this.filterFind();
            });
        } else {
            const displayDataChanges = [
                this.dataChange
            ];
            return merge(...displayDataChanges).map(() => {
                return this.data;
            });
        }        
    }
    filterFind(): Array<Response> {
        const dt = this.data.slice();
        return dt.filter((item: any) => {
            var searchStr = '';
            var searchAdd = '';
            var searchReverse = '';
            for (var i = 0; i < this.columns.length; i++) {
                searchStr = (item[this.columns[i]]+'').toLowerCase();
                if (searchStr.indexOf(this.filter.toLowerCase()) !== -1) {
                    break;
                } else {
                    searchAdd = searchStr;
                    var encontrado = false;
                    for (var k = (i + 1); k < this.columns.length; k++) {
                        searchReverse = searchStr + ' ' + (item[this.columns[k]]+'').toLowerCase();
                        if (searchReverse.indexOf(this.filter.toLowerCase()) !== -1) {
                            encontrado = true;
                            break;
                        } else if (searchAdd.indexOf(this.filter.toLowerCase()) !== -1) {
                            encontrado = true;
                            break;
                        } else {
                            searchAdd = searchAdd + ' ' + (item[this.columns[k]]+'').toLowerCase();
                        }
                    }
                    if (encontrado) {
                        break;
                    }
                    //Reverse
                    searchAdd = searchStr;
                    encontrado = false;
                    for (var k = i; k >= 0; k--) {
                        searchReverse = searchStr + ' ' + (item[this.columns[k]]+'').toLowerCase();
                        if (searchReverse.indexOf(this.filter.toLowerCase()) !== -1) {
                            encontrado = true;
                            break;
                        } else if (searchAdd.indexOf(this.filter.toLowerCase()) !== -1) {
                            encontrado = true;
                            break;
                        } else {
                            searchAdd = searchAdd + ' ' + (item[this.columns[k]]+'').toLowerCase();
                        }
                    }
                    if (encontrado) {
                        break;
                    }
                }
            }
            //console.log(searchAdd);
            return ((searchStr.indexOf(this.filter.toLowerCase()) !== -1) || (searchAdd.indexOf(this.filter.toLowerCase()) !== -1) || (searchReverse.indexOf(this.filter.toLowerCase()) !== -1));
        });
    }
    disconnect() { }
}
