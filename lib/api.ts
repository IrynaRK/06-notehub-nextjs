import axios from 'axios';
import type { Note, NoteTag, FetchNotesResponse } from '../types/note';


axios.defaults.baseURL = "https://next-docs-api.onrender.com";

const getHeaders = () => {
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
return {
  Authorization: `Bearer ${token}`,
}
};


export const getNotes = async (): Promise<FetchNotesResponse> => {
  const res = await axios.get<FetchNotesResponse>("/notes", { headers: getHeaders() });
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

  const res = await axios.get<FetchNotesResponse>(`/notes`, { params, headers: getHeaders(), });
  return res.data;
};

export const createNote = async (
  note: { title: string; content: string; tag: NoteTag }
): Promise<Note> => {
  const res = await axios.post<Note>(`/notes`, note, { headers: getHeaders() });
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${id}`, { headers: getHeaders() });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`, { headers: getHeaders() });
  return res.data;

}