import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NoteRequest} from "../../models/note";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddNoteComponent>
  ) {
    this.form = this.formBuilder.group({
      name: "",
      text: ""
    })
  }

  submit(): void {
    const noteRequest: NoteRequest = {
      name: this.form.controls["name"].value,
      text: this.form.controls["text"].value
    };

    this.dialogRef.close(noteRequest);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  formInvalid(): boolean {
    return (this.form.controls["name"].value === "" || this.form.controls["text"].value === "")
  }
}
