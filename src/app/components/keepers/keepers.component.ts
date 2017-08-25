import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';

@Component({
  selector: 'app-keepers',
  templateUrl: './keepers.component.html',
  animations: [fadeIn]
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
