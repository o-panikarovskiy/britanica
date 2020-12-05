import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  const getByCss = (selector: string) => fixture.debugElement.query(By.css(selector));
  const getEl = (selector: string) => getByCss(selector).nativeElement;
  const getElText = (selector: string) => getEl(selector).innerText;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [AppModule, AuthModule],
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
    expect(getElText('#email mat-error')).toBe('Email is required');
    expect(getElText('#pwd mat-error')).toBe('Password is required');
    expect(getElText('#c-pwd mat-error')).toBe('Plase, confirm password');
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
    expect(getElText('#email mat-error')).toBe('Email is not valid');
    expect(getByCss('#pwd mat-error')).toBeFalsy();
    expect(getByCss('#c-pwd mat-error')).toBeFalsy();
    expect(getElText('#c-pwd-msg mat-error')).toBe(`Passwords doesn't match`);
  });

  it('should sign up new user', async () => {
    // setup
    spyOn(component, 'submit');

    const submitButtonEl = getEl('button[type="submit"]');
    const emailInputEl = getEl('#email input');
    const passwordInputEl = getEl('#pwd input');
    const confirmPasswordInputEl = getEl('#c-pwd input');

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
    expect(component.form.valid).toBe(true);
    expect(component.submit).toHaveBeenCalledTimes(1);
  });
});
