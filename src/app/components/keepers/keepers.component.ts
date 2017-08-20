import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keepers',
  templateUrl: './keepers.component.html'
})
export class KeepersComponent implements OnInit {
    public title: string;

    constructor() {
        this.title = 'Keepers';
    }

    ngOnInit() {
        console.log('Keepers.component cargado');
    }
}
