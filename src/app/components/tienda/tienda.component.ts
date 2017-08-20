import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tienda',
    templateUrl: `./tienda.component.html`,
    styles: ['h1 {color: blue}']
})

export class TiendaComponent {
    public titulo: string;
    public nombreDelParque: string;
    public miParque: any;

    constructor(){
        this.titulo = 'Esta es la tienda';
    }

    mostrarNombre(){
        console.log('this.nombreDelParque: ', this.nombreDelParque);
    }

    verDatosParque(event){
        console.log('event: ', event);
        this.miParque = event;
    }
}
