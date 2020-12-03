import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function mustMatch(controlName: string, matchingControlName: string): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const control = form.get(controlName);
    const matchingControl = form.get(matchingControlName);
    return control && matchingControl && control.value !== matchingControl.value ? { mustMatch: true } : null;
  };
}
