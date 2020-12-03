import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppError } from 'src/app/core/models/app-error';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  public readonly form: FormGroup;
  public isSending = false;
  public serverError: AppError | undefined;

  constructor(
    private readonly router: Router, //
    private readonly authService: AuthService,
  ) {
    this.form = new FormGroup({
      username: new FormControl(void 0, [Validators.required]),
      password: new FormControl(void 0, [Validators.required]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.isSending = true;
    this.serverError = void 0;

    this.authService
      .signIn(this.form.value)
      .subscribe(
        () => {
          this.router.navigateByUrl('/');
        },
        (err: AppError) => {
          this.serverError = err;
        },
      )
      .add(() => (this.isSending = false));
  }
}
