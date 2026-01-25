"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import css from "@/app/@modal/(.)notes/[id]/NotePreview.module.css";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

function NotePreview() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const close = () => router.back();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: !!id,
  });

  if (isLoading) return null;
  if (isError || !note) return <p>Error loading note</p>;

  return (
    <Modal onClose={close}>
      <div className={css.overlay}>
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <span className={css.tag}>{note.tag}</span>
            </div>

            <p className={css.content}>{note.content}</p>

            <div className={css.date}>
              {new Date(note.createdAt).toLocaleDateString()}
            </div>

            <button className={css.backBtn} onClick={close}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default NotePreview;
