//import NoteList from "@/components/NoteList/NoteList";
//import Link from "next/link";
//import { fetchNotes } from "@/lib/api";

import { notFound } from "next/navigation";
import NotesClient from "./Notes.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

interface NotesByTagProps {
  params: Promise<{ slug: string[] }>;
}

const VALID_TAGS = ["all", "Work", "Personal", "Meeting", "Shopping", "Todo"];

const NotesByTag = async ({ params }: NotesByTagProps) => {
  const { slug } = await params;
  const currentTag = slug[0] ?? "all";

  if (!VALID_TAGS.includes(currentTag)) {
    notFound();
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, currentTag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: currentTag === "all" ? "" : currentTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h2>{currentTag === "all" ? "All notes" : `Tag: ${currentTag}`}</h2>
      <NotesClient tag={currentTag === "all" ? "" : currentTag} />
    </HydrationBoundary>
  );
};

export default NotesByTag;
