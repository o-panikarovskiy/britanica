import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { UserIconComponent } from 'src/app/shared/components/user-icon/user-icon.component';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

@NgModule({
  declarations: [
    ValidationMessageComponent, //
    HeaderComponent,
    UserIconComponent,
  ],
  imports: [
    CommonModule, //
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [
    ValidationMessageComponent, //
    HeaderComponent,
    UserIconComponent,
  ],
})
export class SharedModule {}
