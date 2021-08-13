import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNoteComponent } from './add-note.component';
import { MockMatDialog } from "../../mocks/services";
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder } from "@angular/forms";
import { NoteRequest } from "../../models/note";

describe('AddNoteComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNoteComponent ],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useClass: MockMatDialog },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("submit", () => {
    it("should call dialogRef close", () => {
      const closeSpy = spyOn(component["dialogRef"], "close");
      component.form.controls["name"].setValue("test");
      component.form.controls["text"].setValue("test");
      component.submit();
      expect(closeSpy).toHaveBeenCalledWith({name: "test", text: "test"} as NoteRequest)
    });
  });

  describe("cancel", () => {
    it("should call dialogRef close", () => {
      const closeSpy = spyOn(component["dialogRef"], "close");
      component.cancel();
      expect(closeSpy).toHaveBeenCalledWith(null);
    });
  });

  describe("formInvalid", () => {
    it("should return true if name is blank", () => {
      component.form.controls["name"].setValue("");
      component.form.controls["text"].setValue("test");
      expect(component.formInvalid()).toBeTruthy();
    });

    it("should return true if text is blank", () => {
      component.form.controls["name"].setValue("test");
      component.form.controls["text"].setValue("");
      expect(component.formInvalid()).toBeTruthy();
    });

    it("should return false if name and text are populated", () => {
      component.form.controls["name"].setValue("test");
      component.form.controls["text"].setValue("test");
      expect(component.formInvalid()).toBeFalsy();
    });
  });
});
