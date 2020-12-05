import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { SigninComponent } from 'src/app/auth/components/signin/signin.component';
import { AuthService } from 'src/app/core/services/auth.service';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  const get = (selector: string) => fixture.debugElement.query(By.css(selector));
  const getAll = (selector: string) => fixture.debugElement.queryAll(By.css(selector));
  const getEl = (selector: string) => get(selector).nativeElement;
  const getText = (selector: string) => getEl(selector).innerText;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninComponent],
      imports: [AppModule, AuthModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
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
    expect(getText('#username mat-error')).toBe('Username is required');
    expect(getText('#pwd mat-error')).toBe('Password is required');
  });

  it('should be valid form', () => {
    // setup
    spyOn(component, 'submit');
    const submitButtonEl = getEl('button[type="submit"]');
    const emailInputEl = getEl('#username input');
    const passwordInputEl = getEl('#pwd input');

    // assert
    expect(component.form.valid).toBe(false);

    // arrange
    emailInputEl.value = 'some@email.com';
    emailInputEl.dispatchEvent(new Event('input'));
    passwordInputEl.value = 'password';
    passwordInputEl.dispatchEvent(new Event('input'));

    // act
    submitButtonEl.click();
    fixture.detectChanges();

    // assert
    expect(component.submit).toHaveBeenCalledTimes(1);
    expect(component.form.valid).toBe(true);
    expect(getAll('mat-error').length).toBe(0);
  });

  it('should sign in user', () => {
    // setup
    const email = 'some@email.com';
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'signIn').and.callThrough();

    // assert
    expect(component.form.valid).toBe(false);

    // arrange
    component.form.controls['username'].setValue(email);
    component.form.controls['password'].setValue('123456789');

    // act
    component.submit();

    // assert
    expect(component.form.valid).toBe(true);
    expect(authService.signIn).toHaveBeenCalledTimes(1);
  });
});
