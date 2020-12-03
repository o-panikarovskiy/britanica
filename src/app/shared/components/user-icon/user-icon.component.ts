import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.scss'],
})
export class UserIconComponent {
  constructor(private readonly authService: AuthService) {}

  logout() {
    this.authService.logout().subscribe(() => this.authService.goToSignIn());
  }
}
