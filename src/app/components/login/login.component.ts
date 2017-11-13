import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [UserService]
})

export class LoginComponent implements OnInit {

    public title: String;
    public user: User;
    public identity;
    public token: string;
    public status: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ){
        this.title = 'Identificate';
        this.user = new User('', '', '', '', '', 'ROLE_USER', '');
    }

    ngOnInit() {
        console.log('login.component cargado.');
        console.log('this._userService.getIdentity(): ', this._userService.getIdentity());
        console.log('this._userService.getToken(): ', this._userService.getToken());
    }

    onSubmit(){
        // Loguear al usuario y conseguir el objeto
        this._userService.signup(this.user).subscribe(
            response => {
                this.identity = response.user;
                if (!this.identity || !this.identity._id) {
                    console.log('El usuario no se ha logueado correctamente');
                }else {
                    // Vacío el password para que no se muestre en el console.log();
                    this.identity.password = '';
                    // Guardo en el localStorage los datos del usuario
                    localStorage.setItem('identity',JSON.stringify(this.identity));

                    // Conseguir el token
                    this._userService.signup(this.user, 'true').subscribe(
                        response => {
                            this.token = response.token;

                            if (this.token.length <= 0) {
                                console.log('El token no se ha generado');
                            }else {
                                // Guardo en el localStorage el token del usuario logueado
                                localStorage.setItem('token', this.token);
                                this.status = 'success';
                            }
                        },
                        error => {
                            let errorMessage = <any>error;
                            if (errorMessage != null){
                                let body = JSON.parse(error._body);
                                this.status = 'error';
                            }
                        }
                    );
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }

}
