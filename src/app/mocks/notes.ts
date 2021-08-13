import {Note} from "../models/note";

export class mockNotes {
  static mockNote1 = {
    id: "test1",
    name: "testName1",
    text: "testText1",
    lastEditedTs: new Date("01-01-2000")
  } as Note;

  static mockNote2 = {
    id: "test2",
    name: "testName2",
    text: "testText2",
    lastEditedTs: new Date()
  } as Note;

  static mockNote3 = {
    id: "test3",
    name: "testName3",
    text: "testText3",
    lastEditedTs: new Date()
  } as Note;

  static mockNotes = [mockNotes.mockNote1, mockNotes.mockNote2, mockNotes.mockNote3];
}

export class mockNoteRequests {
  static mockNoteRequest1 = {
    name: "testRequest1",
    text: "testRequestText1"
  };

  static mockNoteRequest2 = {
    name: "testRequest2",
    text: "testRequestText2"
  };

  static mockNoteRequest3 = {
    name: "testRequest3",
    text: "testRequestText3"
  };

  static mockNoteRequests = [mockNoteRequests.mockNoteRequest1, mockNoteRequests.mockNoteRequest2, mockNoteRequests.mockNoteRequest3]
}
