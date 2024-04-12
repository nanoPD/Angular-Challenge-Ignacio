import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';

export interface ITableData extends Pick<any, 'id' | 'username' | 'email'> {
    firstname: string;
    surname: string;
  }

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    
    #http = inject(HttpClient);

    url = "https://jsonplaceholder.typicode.com/users"

      getData(): Observable<any[]> {
        return this.#http.get<any>(this.url).pipe(timeout(100000),map((data: any[]) => {
            return data.map(user => {
                const nameWithoutSalutation = user.name.replace(/^(Mr\.|Mrs\.)\s*/, '');
                const nameParts = nameWithoutSalutation.split(' ');
                const firstname = nameParts[0];
                const surname = nameParts.slice(1).join(' ');
        
                return {
                ...user, firstname, surname
                };
            });
        }));
      }
}
