// Importar objetos necesarios para crear el módulo
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Importar componentes
import { GuardarEmailComponent } from './components/guardar-email/guardar-email.component';
import { MostrarEmailComponent } from './components/mostrar-email/mostrar-email.component';
import { MainEmailComponent } from './components/main-email/main-email.component';

// Decorador ngModule para cargar los coponentes y configuración del módulo
@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [ GuardarEmailComponent, MostrarEmailComponent, MainEmailComponent ],
    exports: [MainEmailComponent]
})

export class ModuloEmailModule {}
