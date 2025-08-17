import axios from 'axios';
import type { Note, NoteTag } from '../types/note';
import type { FetchNotesResponse } from '../types/api';
import type { AxiosRequestConfig } from "axios";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const getHeaders = (): AxiosRequestConfig["headers"] => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if (!token) {
    console.warn("No token found in localStorage");
  }

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

export const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });

    const token = response.data.token;

    if (token) {
      localStorage.setItem("token", token);
      console.log("🔐 Токен збережено в localStorage");
    } else {
      console.warn("⚠️ Токен не отримано");
    }
  } catch (error) {
    console.error("❌ Помилка входу:", error);
    throw error;
  }
};

export const testAuth = async () => {
  try {
    const res = await axios.get("/notes", { headers: getHeaders() });
    console.log("✅ Авторизація успішна. Дані:", res.data);
  } catch (error) {
    console.error("❌ Помилка авторизації:", error);
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