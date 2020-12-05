import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { AppError } from 'src/app/core/models/app-error';
import { AuthService } from 'src/app/core/services/auth.service';
import { Destroyer } from 'src/app/core/utils/destroyer';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent extends Destroyer {
  public readonly form: FormGroup;
  public isSending = false;
  public serverError: AppError | undefined;

  constructor(private readonly authService: AuthService) {
    super();
    this.form = new FormGroup({
      username: new FormControl(void 0, [Validators.required]),
      password: new FormControl(void 0, [Validators.required]),
    });
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isSending = true;
    this.serverError = void 0;

    this.authService
      .signIn(this.form.value)
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
