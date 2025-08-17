import NotesClient from "@/app/notes/Notes.client";
import { fetchNotes } from "@/lib/api";

export default async function NotesPage() {
  try {
    const initialData = await fetchNotes('', 1);
    return <NotesClient initialData={initialData} />;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return <p>Could not load notes. Please try again later.</p>;
  }
}