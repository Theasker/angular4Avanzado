import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/core';
import { fadeIn } from '../animation';

@Component({
    selector: 'app-tienda',
    templateUrl: `./tienda.component.html`,
    styles: ['h1 {color: blue}'],
    animations: [
        trigger('marcar', [
            state('inactive', style({
                border: '5px solid #ccc'
            })),
            state('active', style({
                border: '5px solid yellow',
                background: 'red',
                borderRadius: '50px',
                transform: 'scale(1.2)'
            })),
            transition('inactive => active', animate('300ms linear')),
            transition('active => inactive', animate('1s linear')),
        ])
    , fadeIn]
})

export class TiendaComponent implements OnInit {
    public titulo: string;
    public nombreDelParque: string;
    public miParque: any;
    public status: string;

    constructor(){
        this.titulo = 'Esta es la tienda';
        this.status = 'inactive';
    }

    ngOnInit() {
        $('#textojq').hide('')
        $('#botonjq').click(function(){
            $('#textojq').slideToggle();
        });

        $('#caja').dotdotdot();
    }

    mostrarNombre(){
        console.log('this.nombreDelParque: ', this.nombreDelParque);
    }

    verDatosParque(event){
        console.log('event: ', event);
        this.miParque = event;
    }

    public textoRichEditor(content) {
        console.log('content: ', content);
    }

    public cambiarEstado(){
        if (this.status === 'inactive') {
            this.status = 'active';
        } else {
            this.status = 'inactive';
        }
    }
}
