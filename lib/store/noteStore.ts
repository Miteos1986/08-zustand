import { create } from "zustand";
import { persist } from "zustand/middleware";

type NoteDraft = {
  title: string;
  content: string;
  tag: string;
};

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteDraftStore = {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: {
            ...state.draft,
            ...note,
          },
        })),
      clearDraft: () =>
        set({
          draft: initialDraft,
        }),
    }),
    {
      name: "note-draft",
    },
  ),
);
