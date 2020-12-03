import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mustMatch } from 'src/app/auth/validators/must-match';
import { AppError } from 'src/app/core/models/app-error';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public readonly form: FormGroup;
  public isSending = false;
  public serverError: AppError | undefined;

  constructor(private readonly authService: AuthService) {
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
      return;
    }

    this.isSending = true;
    this.serverError = void 0;

    this.authService
      .signUp(this.form.value)
      .subscribe(
        () => {
          this.authService.goToPageAfterLogin();
        },
        (err: AppError) => {
          this.serverError = err;
        },
      )
      .add(() => (this.isSending = false));
  }
}
