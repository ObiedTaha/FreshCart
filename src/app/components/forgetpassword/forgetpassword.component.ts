import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgetPassService } from 'src/app/core/services/forget-pass.service';


@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {
  constructor(private _ForgetPassService: ForgetPassService, private _ToastrService: ToastrService, private _Renderer2: Renderer2 ,private _Router:Router) { }

  passwordShow:boolean=false;
  formCtrl=new FormControl()


  first: boolean = true;
  second: boolean = false;
  done: boolean = false;

  email: string = '';

  forgetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(''),
  });

  resetPassForm: FormGroup = new FormGroup({
    // email:this.forgetForm.get('email')?.value,
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),

  });


  forgetPassword(): void {
    let userEmail = this.forgetForm.value;
    this.email = userEmail.email;
    this._Renderer2.setAttribute

    this._ForgetPassService.forgetPassword(userEmail).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this.first = false
        this.second = true;
      },
      error: (err) => {
        this._ToastrService.error(err.error.message);

      }
    })
  };

  resetCode(): void {
    let resetCode = this.resetCodeForm.value;

    this._ForgetPassService.resetCode(resetCode).subscribe({
      next: (response) => {
        this._ToastrService.success(response.status);
        this.second = false;
        this.done = true;
      },
      error: (err) => {
        this._ToastrService.error(err.error.message);
      }
    });
  };

  resetPassword(): void {
    let resetForm = this.resetPassForm.value;
    resetForm.email=this.email;
    this._ForgetPassService.resetPassword(resetForm).subscribe({
      next:(response)=>{
        if(response.token)
          {
            localStorage.setItem('token',response.token);
            this._Router.navigate(['/home']);
            this._ToastrService.success('Password Change Successfully')
          }
      },
      error:(err)=>{
        this._ToastrService.error('there error on your Password')        
      }
    })
  }


}
