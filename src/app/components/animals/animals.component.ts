import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  animations: [fadeIn]
})
export class AnimalsComponent implements OnInit {
    public title: string;

    constructor() {
        this.title = 'Animals';
    }

    ngOnInit() {
        console.log('animals.component cargado');
    }
}
