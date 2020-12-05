import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { mustMatch } from 'src/app/auth/validators/must-match';
import { AppError } from 'src/app/core/models/app-error';
import { AuthService } from 'src/app/core/services/auth.service';
import { Destroyer } from 'src/app/core/utils/destroyer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent extends Destroyer {
  public readonly form: FormGroup;
  public isSending = false;
  public serverError: AppError | undefined;

  constructor(private readonly authService: AuthService) {
    super();
    this.form = new FormGroup(
      {
        email: new FormControl(void 0, [Validators.required, Validators.email]),
        password: new FormControl(void 0, [Validators.required]),
        passwordVerify: new FormControl(void 0, [Validators.required]),
      },
      mustMatch('password', 'passwordVerify'),
    );
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isSending = true;
    this.serverError = void 0;

    this.authService
      .signUp(this.form.value)
      .pipe(takeUntil(this.destroy$))
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
