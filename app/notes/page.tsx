import NotesClient from './Notes.client';
import { HydrationBoundary, dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';

export default async function NotesPage() {
  const queryClient = new QueryClient();
  const initialData =  await fetchNotes(1);

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''], 
    queryFn: () => fetchNotes(1, '')});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={initialData} />
    </HydrationBoundary>
  );
}
