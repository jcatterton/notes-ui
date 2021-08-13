import { TestBed } from '@angular/core/testing';

import { NotesService } from './notes.service';
import { HttpService } from "../http/http.service";
import { MockHttpService } from "../../mocks/services";
import { mockNoteRequests } from "../../mocks/notes";

describe('NotesService', () => {
  let service: NotesService;
  let httpService: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpService, useClass: MockHttpService }
      ]
    });
    service = TestBed.inject(NotesService);
    httpService = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("getNotes", () => {
    it("should call http get", () => {
      const getSpy = spyOn(httpService, "get");
      service.getNotes();
      expect(getSpy).toHaveBeenCalled();
    });
  });

  describe("getNote", () => {
    it("should call http get", () => {
      const getSpy = spyOn(httpService, "get");
      service.getNote("test");
      expect(getSpy).toHaveBeenCalled();
    });
  });

  describe("editNote", () => {
    it("should call http put", () => {
      const putSpy = spyOn(httpService, "put");
      service.editNote("test", mockNoteRequests.mockNoteRequest1);
      expect(putSpy).toHaveBeenCalled();
    });
  });

  describe("deleteNote", () => {
    it("should call http delete", () => {
      const deleteSpy = spyOn(httpService, "delete");
      service.deleteNote("test");
      expect(deleteSpy).toHaveBeenCalled();
    });
  });

  describe("createNote", () => {
    it("should call http post", () => {
      const postSpy = spyOn(httpService, "post");
      service.createNote(mockNoteRequests.mockNoteRequest1);
      expect(postSpy).toHaveBeenCalled();
    });
  });

  describe("saveToContentService", () => {
    it("should call http post", () => {
      const postSpy = spyOn(httpService, "post");
      service.saveToContentService("test");
      expect(postSpy).toHaveBeenCalled();
    })
  });
});
