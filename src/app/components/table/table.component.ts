import { Component, Input, OnChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

export interface ITableData extends Pick<any, 'id' | 'username' | 'email'> {
  firstname: string;
  surname: string;
}

type columns = 'firstname' | 'surname' | 'username' | 'email';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {

    @Input() sortColumn: columns = 'firstname';
    @Input() sortDirection: 'asc' | 'desc' = 'asc';
    @Input() searchValue: string = '';

    data: ITableData[] = [];
    filteredData: ITableData[] = [];

    constructor(private apiService:ApiService){
    }

    ngOnInit(){ 
        this.getUserData();
    }

    ngOnChanges(): void {
        this.sortData();
    }

    private sortData(): void {
        if (!this.searchValue || this.searchValue.trim() === '') {
            this.filteredData = this.data;
        } else {
            const lowerCaseSearchValue = this.searchValue.toLowerCase().trim();
            this.filteredData = this.data.filter(item =>
                item.firstname.toLowerCase().includes(lowerCaseSearchValue) ||
                item.surname.toLowerCase().includes(lowerCaseSearchValue) ||
                item.username.toLowerCase().includes(lowerCaseSearchValue) ||
                item.email.toLowerCase().includes(lowerCaseSearchValue)
            );
        }
    }

    getUserData(){

        this.apiService.getData().subscribe((res: any[]) => {
            this.data = res;
            this.sortData();
            this.sortTable('firstname');
            },
            (error) => {
                console.error('Some error:', error);
                alert(error);
            }
        );
    }

    sortTable(sortColumn: columns): void {

        if (this.sortColumn === sortColumn) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortColumn = sortColumn;
            this.sortDirection = 'asc';
        }

        this.data.sort((a, b) => {
            const valueA = a[sortColumn];
            const valueB = b[sortColumn];
        
            if (valueA > valueB) {
                return this.sortDirection === 'asc' ? -1 : 1;
            } else if (valueA < valueB) {
                return this.sortDirection === 'asc' ? 1 : -1;
            } else {
                return 0;
            }
          });
    }

}
