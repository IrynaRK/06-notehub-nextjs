import axios from 'axios';
import type { Note, NoteTag } from '../types/note';
import { FetchNotesResponse } from '../components/NotesPage/NotesPage';

axios.defaults.baseURL = "https://next-docs-api.onrender.com";
const API = 'https://next-docs-api.onrender.com';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${token}`,
};

export const getNotes = async () => {
  const res = await axios.get<NoteListResponse>("/notes");
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

  const { data } = await axios.get(`/notes`, { params });
  return data;
};

export const createNote = async (
  note: { title: string; content: string; tag: NoteTag }
): Promise<Note> => {
  const { data } = await axios.post<Note>(`${API}/notes`, note, { headers });
  return data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const { data } = await axios.delete<Note>(`${API}/notes/${id}`, { headers });
  return data;
};


export type NoteListResponse = {
  notes: Note[];
  total: number;
};

export const fetchNotesById = async (id: number): Promise<Note> => {
  const { data } = await axios.get<Note>(`${API}/notes/${id}`, { headers });
  return data;

}