"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "../../page.module.css";

type Props = {
  id: string;
};

const NoteDetailsClient = ({ id }: Props) => {
	  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !note) return <p>Some error..</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <div className={css.container}>
        <div className={css.item}>
      <h2 className={css.header}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <p className={css.data}>{formattedDate}</p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
