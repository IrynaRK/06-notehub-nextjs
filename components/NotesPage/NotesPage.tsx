import { Note } from "@/types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalItems: number;
  page: number;
  perPage: number;
  totalPages: number;
}