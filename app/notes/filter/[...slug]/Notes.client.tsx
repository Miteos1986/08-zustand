"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import css from "./Notes.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import { Toaster } from "react-hot-toast";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Link from "next/link";

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [perPage] = useState<number>(12);
  const [search, setSearch] = useState<string>("");

  const { data, isSuccess, isFetching, isError } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage,
        search,
        tag,
      }),
    placeholderData: keepPreviousData,
  });

  const debouncedSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPage(1);
      setSearch(event.target.value);
    },
    1000,
  );

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onChange={debouncedSearch} />
        <Toaster position="top-right" />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
        {isFetching && !isError && (
          <span className={css.fetching}>Updating...</span>
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}
