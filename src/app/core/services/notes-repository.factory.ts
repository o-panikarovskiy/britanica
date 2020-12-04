import { NotesRepository } from 'src/app/core/abstract/notes.repository';
import { NotesIndexedDBRepository } from 'src/app/core/backend/notes/notes-idb.repository';
import { NotesStoreageRepository } from 'src/app/core/backend/notes/notes-storage.repository';

export function notesRepositoryFactory(): NotesRepository {
  if (window.indexedDB) {
    return new NotesIndexedDBRepository();
  }

  return new NotesStoreageRepository();
}
