import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, DoCheck, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-parques',
    templateUrl: `./parques.component.html`
})

export class ParquesComponent implements OnChanges, OnInit, DoCheck, OnDestroy {
    @Input() public nombre: string;
    @Input() public metros: number;
    public vegetacion: string;
    public abierto: boolean;

    @Output() pasameLosDatos = new EventEmitter();

    constructor(){
        this.nombre = 'Esta es la tienda';
        this.metros = 450;
        this.vegetacion = 'Alta';
        this.abierto = true;
    }

    ngOnDestroy() {
        console.log('OnDestroy se ha ejecutado');
    }

    ngDoCheck() {
        console.log('DoCheck se ha ejecutado');
        //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
        //Add 'implements DoCheck' to the class.
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log('changes: ', changes);
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add 'implements OnChanges' to the class.
    }

    ngOnInit(){
        console.log('Método OnInit cargado');
    }

    emitirEvento(event){
        this.pasameLosDatos.emit({
            'nombre': this.nombre,
            'metros': this.metros,
            'vegetacion': this.vegetacion,
            'abierto': this.abierto
        });
    }
}
