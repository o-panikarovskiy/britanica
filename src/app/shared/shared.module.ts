import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ValidationMessageComponent } from './componetns/validation-message/validation-message.component';

@NgModule({
  declarations: [
    ValidationMessageComponent, //
  ],
  imports: [
    CommonModule, //
    MatFormFieldModule,
  ],
  exports: [
    ValidationMessageComponent, //
  ],
})
export class SharedModule {}
