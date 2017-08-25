import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-admin-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
    public title = 'Listado';
    public numbers: number[] = new Array(25);
}
