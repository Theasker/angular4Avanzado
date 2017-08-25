import { Component, OnInit } from '@angular/core';
import { fadeIn } from '../animation';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  animations: [fadeIn]
})
export class ContactComponent implements OnInit {
    public title: string;
    public emailContacto: string;

    constructor() {
        this.title = 'Contact';
    }

    ngOnInit() {
        console.log('contact.component cargado');
    }

    guardarEmail() {
        localStorage.setItem('emailContacto', this.emailContacto);
        /* console.log('localStorage.getItem(emailContacto): ', localStorage.getItem('emailContacto')); */
    }
}
