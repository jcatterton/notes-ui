import {Component, OnInit} from '@angular/core';
import {NotesService} from "../../services/notes/notes.service";
import {Note, NoteRequest} from "../../models/note";
import {SnackBarPanelClass, SnackbarService} from "../../services/snackbar/snackbar.service";
import {MatDialog} from "@angular/material/dialog";
import {AddNoteComponent} from "../add-note/add-note.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];

  constructor(
    private noteService: NotesService,
    private snackBarService: SnackbarService,
    private dialogService: MatDialog
  ) { }

  ngOnInit(): void {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes().subscribe(
      response => {
        this.notes = response;
        this.sortNotes();
      }, () => {
        this.snackBarService.showMessage("Error retrieving notes", SnackBarPanelClass.fail);
      }
    )
  }

  sortNotes(): void {
    this.filteredNotes = this.notes.sort(function(a: Note, b: Note) {
      if (a.lastEditedTs < b.lastEditedTs) {
        return 1;
      } else if (a.lastEditedTs > b.lastEditedTs) {
        return -1;
      }
      return (a.name.localeCompare(b.name));
    });
  }

  addNote(): void {
    const dialogRef = this.dialogService.open(AddNoteComponent, { width: "700px" });
    dialogRef.afterClosed().subscribe(
      noteRequest => {
        if (noteRequest !== null) {
          this.noteService.createNote(noteRequest).subscribe(
            () => {
              this.snackBarService.showMessage("Note saved successfully", SnackBarPanelClass.success);
              this.getNotes();
            }, err => {
              this.snackBarService.showMessage("Error saving note", SnackBarPanelClass.fail);
              console.error(err);
            }
          )
        }
      }, () => {
        this.snackBarService.showMessage("Error saving note", SnackBarPanelClass.fail)
      }
    )
  }

  saveNote(note: Note, text: string): void {
    const noteRequest = { name: note.name, text: text } as NoteRequest;
    this.noteService.editNote(note.id, noteRequest).subscribe(
      () => {
        this.snackBarService.showMessage("Note saved successfully", SnackBarPanelClass.success);
        this.getNotes();
      }, err => {
        this.snackBarService.showMessage("Error saving note", SnackBarPanelClass.fail);
        console.error(err);
      }
    )
  }

  deleteNote(note: Note): void {
    this.noteService.deleteNote(note.id).subscribe(
      () => {
        this.snackBarService.showMessage("Note deleted successfully", SnackBarPanelClass.success);
        this.getNotes();
      }, err => {
        this.snackBarService.showMessage("Error deleting note", SnackBarPanelClass.fail);
        console.error(err);
      }
    )
  }
}
