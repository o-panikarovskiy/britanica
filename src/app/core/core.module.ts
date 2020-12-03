import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthGuard } from 'src/app/core/auth/guards/auth-guard.guard';
import { AuthApiService } from 'src/app/core/auth/models/auth-api';
import { authApiFactory } from 'src/app/core/auth/services/auth-api.factory';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@NgModule({
  providers: [
    AuthGuard, //
    AuthService,
    { provide: AuthApiService, useFactory: authApiFactory },
  ],
  imports: [],
  exports: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
