import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-main-email',
  template: `
    <div class="panel panel-default">
      <h2>{{title}}</h2>
      <hr>
      <app-guardar-email></app-guardar-email>
      <app-mostrar-email></app-mostrar-email>
    </div>
  `
})
export class MainEmailComponent {
  public title = 'Modulo de emails';
}