import { Observable, of } from "rxjs";
import { MatDialogConfig } from "@angular/material/dialog";
import { ComponentType } from "@angular/cdk/portal";
import { LoginRequest } from "../models/user";
import { SnackBarPanelClass } from "../services/snackbar/snackbar.service";
import { NoteRequest } from "../models/note";
import { mockNotes } from "./notes";

export class MockMatDialog {
  open(component: ComponentType<any>, config?: MatDialogConfig) {
    return{
      afterClosed() {
        return of({});
      }
    }
  }

  close(dialogResult?: any): void {};

  closeAll(): void {};
}

export class MockSnackBarService {
  showMessage(msg: string, panelClass: SnackBarPanelClass) {};
}

export class MockHttpService {
  get<T>(url: string): Observable<any> {
    return of(null);
  }

  post<T>(url: string, body: any): Observable<any> {
    return of(null);
  }

  put<T>(url: string, body: any): Observable<any> {
    return of(null);
  }

  delete<T>(url: string): Observable<any> {
    return of(null);
  }
}

export class MockLoginService {
  generateToken(user: LoginRequest): Observable<any> {
    return of(null);
  }

  validateToken(): Observable<any> {
    return of(null);
  }
}

export class MockNotesService {
  getNotes(): Observable<any> {
    return of(mockNotes.mockNotes);
  }

  getNote(id: string): Observable<any> {
    return of(mockNotes.mockNote1);
  }

  editNote(id: string, note: NoteRequest): Observable<any> {
    return of(null);
  }

  deleteNote(id: string): Observable<any> {
    return of(null);
  }

  createNote(note: NoteRequest): Observable<any> {
    return of(null);
  }

  saveToContentService(id: string): Observable<any> {
    return of(null);
  }
}
