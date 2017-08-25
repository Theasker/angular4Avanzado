import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [fadeIn]
})
export class HomeComponent implements OnInit {
    public title: string;

    constructor() {
        this.title = 'Bienvenido a ngZoo';
    }

    ngOnInit() {
        console.log('home.component cargado');
    }
}
