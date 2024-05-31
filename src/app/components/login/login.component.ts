import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router,private _ToastrService:ToastrService) { }
  // global variables

  isLoading: boolean = false;
  passwordShow: boolean = false;

  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]],
  });


//this handel form to send the object to backend
  handelForm(): void {
    const userData = this.loginForm.value;
    this.isLoading=true;

    if (this.loginForm.valid == true) {
      this._AuthService.login(userData).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            // set token at local storage
            localStorage.setItem('token',response.token);
            //that decode token 
            this._AuthService.decodeToken();
            this.isLoading = false;
            this._Router.navigate(['/home']);
            this._ToastrService.success('Welcome Back...')
          }
        },
        error: (err) => {
          this.isLoading=false;
          this._ToastrService.error(err.error.message);
        }
      })
    }
  }
}
