import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from 'src/app/app.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  const get = (selector: string) => fixture.debugElement.query(By.css(selector));
  const getAll = (selector: string) => fixture.debugElement.queryAll(By.css(selector));
  const getEl = (selector: string) => get(selector).nativeElement;
  const getText = (selector: string) => getEl(selector).innerText;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [AppModule, AuthModule, RouterTestingModule.withRoutes([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct required validation messages', () => {
    // setup
    spyOn(component, 'submit');
    const submitButtonEl = getEl('button[type="submit"]');

    // act
    submitButtonEl.click();
    fixture.detectChanges();

    // assert
    expect(component.form.valid).toBe(false);
    expect(component.submit).toHaveBeenCalledTimes(1);
    expect(getText('#email mat-error')).toBe('Email is required');
    expect(getText('#pwd mat-error')).toBe('Password is required');
    expect(getText('#c-pwd mat-error')).toBe('Plase, confirm password');
  });

  it('should show correct wrong input validation messages', () => {
    // setup
    spyOn(component, 'submit');
    const submitButtonEl = getEl('button[type="submit"]');
    const emailInputEl = getEl('#email input');
    const passwordInputEl = getEl('#pwd input');
    const confirmPasswordInputEl = getEl('#c-pwd input');

    // arrange
    emailInputEl.value = 'wrong email';
    emailInputEl.dispatchEvent(new Event('input'));
    passwordInputEl.value = 'password';
    passwordInputEl.dispatchEvent(new Event('input'));
    confirmPasswordInputEl.value = 'not match password';
    confirmPasswordInputEl.dispatchEvent(new Event('input'));

    // act
    submitButtonEl.click();
    fixture.detectChanges();

    // assert
    expect(component.form.valid).toBe(false);
    expect(component.submit).toHaveBeenCalledTimes(1);
    expect(getText('#email mat-error')).toBe('Email is not valid');
    expect(get('#pwd mat-error')).toBeFalsy();
    expect(get('#c-pwd mat-error')).toBeFalsy();
    expect(getText('#c-pwd-msg mat-error')).toBe(`Passwords doesn't match`);
  });

  it('should be valid form', () => {
    // setup
    spyOn(component, 'submit');
    const submitButtonEl = getEl('button[type="submit"]');
    const emailInputEl = getEl('#email input');
    const passwordInputEl = getEl('#pwd input');
    const confirmPasswordInputEl = getEl('#c-pwd input');

    // assert
    expect(component.form.valid).toBe(false);

    // arrange
    emailInputEl.value = 'some@email.com';
    emailInputEl.dispatchEvent(new Event('input'));
    passwordInputEl.value = 'password';
    passwordInputEl.dispatchEvent(new Event('input'));
    confirmPasswordInputEl.value = 'password';
    confirmPasswordInputEl.dispatchEvent(new Event('input'));

    // act
    submitButtonEl.click();
    fixture.detectChanges();

    // assert
    expect(component.submit).toHaveBeenCalledTimes(1);
    expect(component.form.valid).toBe(true);
    expect(getAll('mat-error').length).toBe(0);
  });

  it('should sign up', () => {
    // setup
    const email = `${Math.random()}@test.com`;
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'signUp').and.callThrough();

    // assert
    expect(component.form.valid).toBe(false);

    // arrange
    component.form.controls['email'].setValue(email);
    component.form.controls['password'].setValue('123456789');
    component.form.controls['passwordVerify'].setValue('123456789');

    // act
    component.submit();

    // assert
    expect(component.form.valid).toBe(true);
    expect(authService.signUp).toHaveBeenCalledTimes(1);
  });
});
