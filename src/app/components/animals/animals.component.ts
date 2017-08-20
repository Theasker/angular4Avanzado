import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html'
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
