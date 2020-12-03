import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NotesRepository } from 'src/app/core/backend/abstract-notes.repository';
import { SessionStrategy } from 'src/app/core/backend/abstract-session.stategy';
import { UsersRepository } from 'src/app/core/backend/abstract-users.repository';
import { BackendMockAuthController } from 'src/app/core/backend/backend-auth.controller';
import { BackendMockNotesController } from 'src/app/core/backend/backend-notes.controller';
import { SessionCookieStrategy } from 'src/app/core/backend/session-cookie.strategy';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';
import { AuthApiService } from 'src/app/core/services/abstract-auth-api.service';
import { NotesApiService } from 'src/app/core/services/abstract-notes-api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { notesRepositoryFactory } from 'src/app/core/utils/notes-repository.factory';
import { usersRepositoryFactory } from 'src/app/core/utils/users-repository.factory';

@NgModule({
  providers: [
    AuthGuard, //
    AuthService,
    { provide: UsersRepository, useFactory: usersRepositoryFactory },
    { provide: NotesRepository, useFactory: notesRepositoryFactory },
    { provide: AuthApiService, useClass: BackendMockAuthController },
    { provide: NotesApiService, useClass: BackendMockNotesController },
    { provide: SessionStrategy, useClass: SessionCookieStrategy },
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
