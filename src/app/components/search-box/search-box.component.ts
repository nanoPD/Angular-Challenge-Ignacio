import { Component, EventEmitter, Output, NgModule } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent  {
  // @TODO
  @Output() searchFilter = new EventEmitter<string>();

  onInputChange(event: any): void {
    const searchTerm = event.target.value.trim();
    this.searchFilter.emit(searchTerm);
  }
}
 