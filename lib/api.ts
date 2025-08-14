import axios from 'axios';
import type { Note, NoteTag } from '../types/note';
import { FetchNotesResponse } from '../components/NotesPage/NotesPage';

axios.defaults.baseURL = "https://next-docs-api.onrender.com";
const API = 'https://next-docs-api.onrender.com';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${token}`,
};

export type NoteListResponse = {
  notes: Note[];
  totalPages: number;
  totalItems: number;
  page: number;
  perPage: number;
}

export const getNotes = async (): Promise<NoteListResponse> => {
  const res = await axios.get<NoteListResponse>("/notes", { headers });
  return res.data;
};

export const fetchNotes = async (
  page: number,
  search?: string
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage: 12,
  };

  if (search?.trim()) {
    params.search = search;
  }

  const res = await axios.get<NoteListResponse>(`/notes`, { params, headers, });
  return res.data;
};

export const createNote = async (
  note: { title: string; content: string; tag: NoteTag }
): Promise<Note> => {
  const res = await axios.post<Note>(`${API}/notes`, note, { headers });
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`${API}/notes/${id}`, { headers });
  return res.data;
};

export const fetchNotesById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`${API}/notes/${id}`, { headers });
  return res.data;

}