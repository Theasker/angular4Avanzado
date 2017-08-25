import { Component } from '@angular/core';

@Component({
  selector: 'app-guardar-email',
  template: `
    <h4>{{title}}</h4>

    <input type="text" [(ngModel)]="emailContacto" />
    <button (click)="guardarEmail()">Guardar email</button>
  `
})
export class GuardarEmailComponent {
    public title = 'Guardar email';
    public emailContacto: string;

    guardarEmail() {
        localStorage.setItem('emailContacto', this.emailContacto);
        /* console.log('localStorage.getItem(emailContacto): ', localStorage.getItem('emailContacto')); */
    }
}
