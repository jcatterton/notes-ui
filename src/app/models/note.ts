export interface NoteRequest {
  name: string;
  text: string;
}

export interface Note {
  id: string;
  name: string;
  lastEditedTs: Date;
  text: string;
}
