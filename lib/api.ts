import axios from 'axios';
import type { Note, NoteTag } from '../types/note';
import type { FetchNotesResponse } from '../types/api';


axios.defaults.baseURL = "https://notehub-public.goit.study/api";


const getHeaders = () => {
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
return {
  Authorization: `Bearer ${token}`,
}
}

export const fetchNotes = async (searchText: string, page:number): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>('/notes', {
    params: {
      ...(searchText ? { search: searchText } : {}),
      page,
      perPage: 12,
    },
    headers: getHeaders(),
    
  });
  return response.data;
};


export const createNote = async (
  note: { title: string; content: string; tag: NoteTag }
): Promise<Note> => {
  const response = await axios.post<Note>(`/notes`, note, { headers: getHeaders() });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${id}`, { headers: getHeaders() });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`, { headers: getHeaders() });
  return response.data;

}