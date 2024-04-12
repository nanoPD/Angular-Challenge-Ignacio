import { Component, inject } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

    #api = inject(ApiService);
    
    search_input: string = '';

    onSearchFilter(value: string): void {
        this.search_input = value;
    }

    private getData(){
        this.#api.getData();
    }
}
