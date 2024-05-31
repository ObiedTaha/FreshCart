import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TranslateModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService, private _Router: Router,private _ToastrService:ToastrService) { }
  // global variables
  errMessage: string = '';
  isLoading: boolean = false;
  //that handel eye icon for password input
  passwordShow: boolean = false;
  rePasswordShow: boolean = false;


  registerForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]],
    rePassword: [''],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]

  }, { validators: [this.confirmPassword] });

  // this confirm the  pass with rePass
  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if (rePassword?.value == '')
      rePassword.setErrors({ required: true })

    else if (password?.value != rePassword?.value)
      rePassword?.setErrors({ mismatch: true })
  }

  //this handel form to send the object to backend
  handelForm(): void {
    const userData = this.registerForm.value;
    this.isLoading = true;

    if (this.registerForm.valid == true) {
      this._AuthService.register(userData).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this.isLoading = false;
            this._Router.navigate(['/login']);
            this._ToastrService.success('Register Done....')
          }
        },
        error: (err) => {
          this.errMessage = err.error.message;
          this.isLoading = false;
          this._ToastrService.error(this.errMessage);

        }
      })

    }
  }

}
