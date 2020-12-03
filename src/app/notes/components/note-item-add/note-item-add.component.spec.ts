import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoteItemAddComponent } from './note-item-add.component';

describe('NoteItemAddComponent', () => {
  let component: NoteItemAddComponent;
  let fixture: ComponentFixture<NoteItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteItemAddComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
