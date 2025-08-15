'use client';

import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../lib/api';
import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import NoteForm from '../../components/NoteForm/NoteForm';
import Modal from '../../components/NoteModal/NoteModal';
import css from '../page.module.css';
import type {  FetchNotesResponse } from '@/types/api';

type Props = {
  initialData: FetchNotesResponse;
}

export default function NotesClient({initialData}: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, debouncedSearch),
    placeholderData: keepPreviousData,
     initialData: page === 1 && !debouncedSearch ? initialData : undefined,

  });


  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

   const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {data && data.totalPages > 1 && (
          <Pagination page={page} totalPages={data.totalPages} onChange={setPage} />
        )}
        <button className={css.button} 
        onClick={handleOpenModal}
        aria-label='створити нову нотатку'>
          Create note +
        </button>
      </header>

      {isLoading && <p className={css.status}>Loading...</p>}
      {isError && <p className={css.status}>Error fetching notes</p>}

      {data?.notes.length ? (
        <NoteList notes={data.notes} />
      ) : (
        <p className={css.empty}>No notes found</p>
      )}

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <NoteForm onSuccess={handleCloseModal} />
        </Modal>
      )}
   </div>
  );
}
