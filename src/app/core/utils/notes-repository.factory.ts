import { NotesRepository } from 'src/app/core/backend/abstract-notes.repository';
import { NotesIndexedDBRepository } from 'src/app/core/backend/notes-idb.repository';

export function notesRepositoryFactory(): NotesRepository {
  if (window.indexedDB) {
    return new NotesIndexedDBRepository();
  }

  throw new Error('Cante resolve NotesRepository.');
}
