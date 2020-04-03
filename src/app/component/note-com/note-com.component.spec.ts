import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteComComponent } from './note-com.component';

describe('NoteComComponent', () => {
  let component: NoteComComponent;
  let fixture: ComponentFixture<NoteComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
