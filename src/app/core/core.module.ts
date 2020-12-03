import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SessionStrategy } from 'src/app/core/backend/abstract-session.stategy';
import { UsersRepository } from 'src/app/core/backend/abstract-users.repository';
import { BackendMockAuthController } from 'src/app/core/backend/backend-auth.controller';
import { SessionCookieStrategy } from 'src/app/core/backend/session-cookie.strategy';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';
import { AuthApiService } from 'src/app/core/services/auth-api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { usersRepositoryFactory } from 'src/app/core/utils/users-repository.factory';

@NgModule({
  providers: [
    AuthGuard, //
    AuthService,
    { provide: AuthApiService, useClass: BackendMockAuthController },
    { provide: SessionStrategy, useClass: SessionCookieStrategy },
    { provide: UsersRepository, useFactory: usersRepositoryFactory },
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
