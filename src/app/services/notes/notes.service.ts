import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { Note, NoteRequest } from "../../models/note";
import { HttpResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  readonly baseURL = "api";

  constructor(
    private http: HttpService
  ) { }

  getNotes(): Observable<Note[]> {
    return this.http.get(`${this.baseURL}/notes`);
  }

  getNote(id: string): Observable<Note> {
    return this.http.get(`${this.baseURL}/note/${id}`);
  }

  editNote(id: string, note: NoteRequest): Observable<HttpResponse<object>> {
    return this.http.put(`${this.baseURL}/note/${id}`, note);
  }

  deleteNote(id: string): Observable<HttpResponse<object>> {
    return this.http.delete(`${this.baseURL}/note/${id}`);
  }

  createNote(note: NoteRequest): Observable<HttpResponse<object>> {
    return this.http.post(`${this.baseURL}/note`, note);
  }

  saveToContentService(id: string): Observable<HttpResponse<object>> {
    return this.http.post(`${this.baseURL}/save/${id}`, null);
  }
}
