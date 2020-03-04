import { Component, ElementRef, ViewChild, Inject, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

/*export class InlineEditDialog {
    value = '';    

    constructor(
        private dialogRef: MatDialogRef<InlineEditDialog>,
        @Inject(MAT_DIALOG_DATA) private data
    ) {
        //console.log(data);
        this.value = data.initialValue;
    }

    closeIfEnter(event: KeyboardEvent) {
        if (event.code === 'Enter' && this.value !== '') {
            this.dialogRef.close(this.value);
        }
    }
}*/

@Component({
    selector: 'table-edit-component',
    styleUrls: ['tableEdit.component.css'],
    templateUrl: 'tableEdit.component.html',
})
export class TableEditComponent {
    displayedColumns = [];
    @ViewChild('main')
    main: ElementRef;
    public columnsContainer = [];
    dataSource: ExampleDataSource | null;
    public rowExample = {};
    public isSelected: boolean = false;
    public selectedRowIndex: number = -1;

    @Output()
    rowEmit: EventEmitter<any[]> = new EventEmitter<any[]>();

    @Output()
    buttonRowEmit: EventEmitter<any[]> = new EventEmitter<any[]>();

    @Output()
    public finalRowEmit: EventEmitter<any[]> = new EventEmitter<any[]>();

    constructor(private dialog: MatDialog) { }

    public ngOnInit() {
        this.dataSource = new ExampleDataSource(this.main);
    }
    public setDisplayedColumns(display: any[]) {
        this.displayedColumns = display;
    }
    public setColumnsContainer(columns: any[]) {
        this.columnsContainer = columns;
        //this.dataSource.co
    }
    public initDatasource() {
        this.dataSource = new ExampleDataSource(this.main);
    }
    public cmpText(type: string): boolean {
        if (type === 'text') {
            return true;
        } else {
            return false;
        }
    }
    public cmpTextNormal(type: string): boolean {
        if (type === 'textNormal') {
            return true;
        } else {
            return false;
        }
    }
    public cmpButton(type: string): boolean {
        if (type === 'button') {
            return true;
        } else {
            return false;
        }
    }
    public cmpLabel(type: string): boolean {
        if (type === 'label') {
            return true;
        } else {
            return false;
        }
    }
    public cmpDate(type: string): boolean {
        if (type === 'date') {
            return true;
        } else {
            return false;
        }
    }
    public cmpImg(type: string): boolean {
        if (type === 'img') {
            return true;
        } else {
            return false;
        }
    }
    public validateImg(img:string): string {
        return img;
    }
    public cmpEmitResult(type: string): boolean {
        if (type === 'emit') {
            return true;
        } else {
            return false;
        }
    }
    public cmpEmitButtonResult(type: string): boolean {
        if (type === 'emitButton') {
            return true;
        } else {
            return false;
        }
    }
    public cmpButtonReport(type: string): boolean {
      if (type === 'reportButton') {
        return true;
      } else {
        return false;
      }
    }
    public cmpButtonCalculateWeight(type: string): boolean {
      if (type === 'calculateWeightButton') {
        return true;
      } else {
        return false;
      }
    }
    public deleteRow(row,column,index) {
        //console.log(row);
        //console.log(column);
        //console.log(index);
        var emit = [];
        emit.push(row);
        emit.push(column);
        emit.push(index);
        emit.push("delete");
        this.rowEmit.emit(emit);

       /* var data = this.dataSource.data;
        var array = [];
        for (var i = 0; i < data.length; i++) {
            if (i !== index) {
                array.push(data[i]);
            }
            
        }
        //array.push(this.rowExample);
        this.dataSource = new ExampleDataSource(this.main);
        this.dataSource.setData(array);*/
    }

    public editRow(row, column, index) {
        //console.log(row);
        //console.log(column);
        //console.log(index);
        var emit = [];
        emit.push(row);
        emit.push(column);
        emit.push(index);
        emit.push("edit");
        this.rowEmit.emit(emit);
    }

    public emitRow(row, column, index) {
      //console.log(row);
      //console.log(column);
      //console.log(index);
        var emit = [];
        emit.push(row);
        emit.push(column);
        emit.push(index);
        this.rowEmit.emit(emit);
    }

    public buttonEmitRow(row, column, index) {
      //console.log(row);
      //console.log(column);
      //console.log(index);
      var emit = [];
      emit.push(row);
      emit.push(column);
      emit.push(index);
      this.finalRowEmit.emit(emit);
    }

    public changeRow(event, row, column) {
        //console.log(row);
        row[column.columnDef] = Number(event.currentTarget.value);
    }

    public highlight(row) {
      this.selectedRowIndex = row.id;
    }

    public checkEnterKey(event, row, column, rowIndex) {

        this.dataSource.data[rowIndex][column.columnDef] = Number(event.currentTarget.value);
        //console.log(this.dataSource.data);
        let control = event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        var tmp = control;
        control = control.nextElementSibling;
        while (true) {
            //console.log(control);
            if (control) {
                var sibling = control.querySelector('INPUT');
                //console.log(sibling);
                if (sibling) {
                    if (sibling.nodeName == 'INPUT') {
                        sibling.select();
                        sibling.focus();
                        return;
                    }
                }
                control = control.nextElementSibling;
            }
            else {
                var parent = this.main.nativeElement.children[0].children;
                //console.log(tmp.parentNode);
                var index = 0;
                for (var i = 0; i < parent.length; i++) {
                    if (tmp.parentNode == parent[i]) {
                        index = i;
                        break;
                    }
                }
                //console.log(index);
                //console.log(parent.length);
                index += 1;//esto es por header de la tabla 
                if (index === parent.length) {
                    var emit = [];
                    emit.push(row);
                    emit.push(column);
                    emit.push(rowIndex);
                    this.finalRowEmit.emit(emit);
                    //console.log(emit);
                    /*var copiedData = this.dataSource.data.slice();
                    var row1 = this.rowExample;                    
                    var obj = {};
                    for (var i = 0; i < this.columnsContainer.length; i++) {
                        obj[this.columnsContainer[i].columnDef] = this.columnsContainer[i].valueDefault;
                    }
                    copiedData.push(obj);
                    this.dataSource.dataChange.next(copiedData);*/
                }
                /*var me = this;
                setTimeout(function () {
                    parent = parent[index];
                    sibling = parent.querySelector('INPUT');
                    sibling.select();
                    sibling.focus();
                }, 10);*/
                
                return;
            }
        }
        //console.log(event.currentTarget.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);

    }

    /*editProgress(user: UserData) {
        //console.log(user);
        const dialogRef = this.dialog.open(InlineEditDialog, {
            data: { initialValue: user.progress }
        });

        dialogRef.afterClosed()
            .filter(x => x != null)
            .subscribe(x => this.exampleDatabase.updateUserProgress(user, x));
    }*/

}

export class ExampleDataSource extends DataSource<any> {
    dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);  
    get data(): any[] {
        return this.dataChange.value;
    }
    public setData(data: any[]) {
        for (let i = 0; i < data.length; i++) {
            const copiedData = this.data.slice();
            copiedData.push(data[i]);
            this.dataChange.next(copiedData);
        }
        var parent = this.main.nativeElement.children[0].children;
        //console.log(parent);
        var me = this;
        setTimeout(function () {
            //console.log(parent.length);
            parent = parent[parent.length - 1];
            var sibling = parent.querySelector('INPUT');
            //console.log(sibling);
            if (sibling!==null) {
                sibling.select();
                sibling.focus();
            }            
        }, 10);
    }
    constructor(public main: ElementRef) {
        super();
    }

    connect(): Observable<any[]> {
        return this.dataChange;
    }

    disconnect() { }    
}



