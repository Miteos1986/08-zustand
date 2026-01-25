import axios from "axios";
import type { Note, CreateNote } from "../types/note";

const API = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = {
    page,
    perPage,
  };

  if (search && search !== "") {
    params.search = search;
  }

  if (tag && tag !== "") {
    params.tag = tag;
  }

  const response = await API.get<FetchNotesResponse>("/notes", {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params,
  });

  return response.data;
};

export const fetchNoteById = async (noteId: Note["id"]): Promise<Note> => {
  const response = await API.get<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const response = await API.post<Note>("/notes", payload, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
  const response = await API.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
};
