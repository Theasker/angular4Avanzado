import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
    public title = 'ngZoo';
    public emailContacto: string;

    ngOnInit() {

    }

    ngDoCheck() {
      this.emailContacto = localStorage.getItem('emailContacto');    
    }

    borrarEmail() {
      localStorage.removeItem('emailContacto');

      //localStorage.clear();
      this.emailContacto = null;
    }
}
