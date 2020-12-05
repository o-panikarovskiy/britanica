import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { Destroyer } from 'src/app/core/utils/destroyer';

@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.scss'],
})
export class UserIconComponent extends Destroyer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  logout(): void {
    this.authService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.authService.goToSignIn());
  }
}
