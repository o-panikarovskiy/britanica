import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AuthApiService } from 'src/app/core/abstract/auth-api.service';
import { NotesApiService } from 'src/app/core/abstract/notes-api.service';
import { NotesRepository } from 'src/app/core/abstract/notes.repository';
import { SessionStrategy } from 'src/app/core/abstract/session.stategy';
import { UsersRepository } from 'src/app/core/abstract/users.repository';
import { BackendMockAuthController } from 'src/app/core/backend/auth/auth.controller';
import { SessionCookieStrategy } from 'src/app/core/backend/auth/session-cookie.strategy';
import { BackendMockNotesController } from 'src/app/core/backend/notes/notes.controller';
import { AuthGuard } from 'src/app/core/guards/auth-guard.guard';
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
