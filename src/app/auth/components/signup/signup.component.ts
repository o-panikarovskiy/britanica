import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mustMatch } from 'src/app/auth/validators/must-match';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public readonly form: FormGroup;

  constructor() {
    this.form = new FormGroup(
      {
        email: new FormControl(void 0, [Validators.required, Validators.email]),
        password: new FormControl(void 0, [Validators.required]),
        passwordVerify: new FormControl(void 0, [Validators.required]),
      },
      mustMatch('password', 'passwordVerify'),
    );
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
  }
}
