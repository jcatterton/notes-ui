import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { NotesService } from "../../services/notes/notes.service";
import {MockMatDialog, MockNotesService, MockSnackBarService} from "../../mocks/services";
import {of, throwError} from "rxjs";
import {mockNoteRequests, mockNotes} from "../../mocks/notes";
import {SnackBarPanelClass, SnackbarService} from "../../services/snackbar/snackbar.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AddNoteComponent} from "../add-note/add-note.component";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let notesService: MockNotesService;
  let snackBarService: MockSnackBarService;
  let dialogService: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        { provide: NotesService, useClass: MockNotesService },
        { provide: SnackbarService, useClass: MockSnackBarService },
        { provide: MatDialog, useClass: MockMatDialog },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    notesService = TestBed.inject(NotesService);
    snackBarService = TestBed.inject(SnackbarService);
    dialogService = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should call getNotes", () => {
      const notesSpy = spyOn(component, "getNotes").and.stub();
      component.ngOnInit();
      expect(notesSpy).toHaveBeenCalled();
    });
  });

  describe("getNotes", () => {
    it("should call notesService getNotes", () => {
      const getNotesSpy = spyOn(notesService, "getNotes").and.callThrough();
      component.getNotes();
      expect(getNotesSpy).toHaveBeenCalled();
    });

    it("should call sortNotes on success", () => {
      spyOn(notesService, "getNotes").and.callThrough();
      const sortNotesSpy = spyOn(component, "sortNotes");
      component.getNotes();
      expect(sortNotesSpy).toHaveBeenCalled();
    });

    it("should show error snackbar on error", () => {
      spyOn(notesService, "getNotes").and.returnValue(throwError("test"));
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      component.getNotes();
      expect(snackBarSpy).toHaveBeenCalledWith("Error retrieving notes", SnackBarPanelClass.fail);
    });
  });

  describe("sortNotes", () => {
    it("should sort notes newest to oldest", () => {
      component.notes = [mockNotes.mockNotes[1], mockNotes.mockNotes[0], mockNotes.mockNotes[2]];
      component.sortNotes();
      expect(component.notes[0].lastEditedTs > component.notes[1].lastEditedTs);
      expect(component.notes[1].lastEditedTs > component.notes[2].lastEditedTs);
    });
  });

  describe("addNote", () => {
    it("should open dialog", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(),
        componentInstance: {}
      });
      const dialogSpy = spyOn(dialogService, "open").and.returnValue(dialogRef);
      component.addNote();
      expect(dialogSpy).toHaveBeenCalledWith(AddNoteComponent, { width: "700px" });
    });

    it("should call noteService createNote if dialog closes successfully", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(mockNoteRequests.mockNoteRequest1),
        componentInstance: {}
      });
      spyOn(dialogService, "open").and.returnValue(dialogRef);
      const serviceSpy = spyOn(notesService, "createNote");
      component.addNote();
      expect(serviceSpy).toHaveBeenCalled();
    });

    it("should show success snackBar and call getNotes if note is created successfully", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(mockNoteRequests.mockNoteRequest1),
        componentInstance: {}
      });
      spyOn(dialogService, "open").and.returnValue(dialogRef);
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      const getNotesSpy = spyOn(component, "getNotes");
      component.addNote();
      expect(snackBarSpy).toHaveBeenCalledWith("Note saved successfully", SnackBarPanelClass.success);
      expect(getNotesSpy).toHaveBeenCalled();
    });

    it("should show failure snackBar if error occurs creating note", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: of(mockNoteRequests.mockNoteRequest1),
        componentInstance: {}
      });
      spyOn(dialogService, "open").and.returnValue(dialogRef);
      spyOn(notesService, "createNote").and.returnValue(throwError("test"));
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      component.addNote();
      expect(snackBarSpy).toHaveBeenCalledWith("Error saving note", SnackBarPanelClass.fail);
    });

    it("should show error snackBar if dialog closes with error", () => {
      const dialogRef = jasmine.createSpyObj({
        afterClosed: throwError("test"),
        componentInstance: {}
      });
      spyOn(dialogService, "open").and.returnValue(dialogRef);
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      component.addNote();
      expect(snackBarSpy).toHaveBeenCalledWith("Error saving note", SnackBarPanelClass.fail);
    });
  });

  describe("saveNote", () => {
    it("should call noteService editNote", () => {
      const serviceSpy = spyOn(notesService, "editNote").and.callThrough();
      component.saveNote(mockNotes.mockNote1, "test");
      expect(serviceSpy).toHaveBeenCalled();
    });

    it("should show success snackBar and call getNotes if note is saved successfully", () => {
      spyOn(notesService, "editNote").and.callThrough();
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      const getNotesSpy = spyOn(component, "getNotes");
      component.saveNote(mockNotes.mockNote1, "test");
      expect(snackBarSpy).toHaveBeenCalledWith("Note saved successfully", SnackBarPanelClass.success);
      expect(getNotesSpy).toHaveBeenCalled();
    });

    it("should show failure snackBar if note is not saved successfully", () => {
      spyOn(notesService, "editNote").and.returnValue(throwError("test"));
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      component.saveNote(mockNotes.mockNote1, "test");
      expect(snackBarSpy).toHaveBeenCalledWith("Error saving note", SnackBarPanelClass.fail);
    });
  });

  describe("deleteNote", () => {
    it("should call noteService deleteNote", () => {
      const serviceSpy = spyOn(notesService, "deleteNote").and.callThrough();
      component.deleteNote(mockNotes.mockNote1);
      expect(serviceSpy).toHaveBeenCalled();
    });

    it("should show success snackBar and call getNotes if note is deleted successfully", () => {
      spyOn(notesService, "deleteNote").and.callThrough();
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      const getNotesSpy = spyOn(component, "getNotes");
      component.deleteNote(mockNotes.mockNote1);
      expect(snackBarSpy).toHaveBeenCalledWith("Note deleted successfully", SnackBarPanelClass.success);
      expect(getNotesSpy).toHaveBeenCalled();
    });

    it("should show failure snackBar if note is not deleted successfully", () => {
      spyOn(notesService, "deleteNote").and.returnValue(throwError("test"));
      const snackBarSpy = spyOn(snackBarService, "showMessage");
      component.deleteNote(mockNotes.mockNote1);
      expect(snackBarSpy).toHaveBeenCalledWith("Error deleting note", SnackBarPanelClass.fail);
    });
  });
});
