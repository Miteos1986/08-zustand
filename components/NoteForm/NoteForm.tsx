"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";
import React from "react";
//import toast from "react-hot-toast";
//import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
//import * as Yup from "yup";

interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setDraft({ [name]: value });
  };

  const handleCancel = () => {
    router.push("/notes/filter/all");
  };

  const handleSubmit = (formData: FormData) => {
    const payload: NoteFormValues = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as string,
    };

    mutate(payload);
  };

  console.log(draft);

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          defaultValue={draft.title}
          className={css.input}
          required
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          onChange={handleChange}
          defaultValue={draft.content}
          className={css.textarea}
        />
      </div>
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          onChange={handleChange}
          defaultValue={draft.tag}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>
      <button type="button" className={css.cancelButton} onClick={handleCancel}>
        Cancel
      </button>

      <button type="submit" className={css.submitButton} disabled={isPending}>
        Create note
      </button>
    </form>
  );
};

export default NoteForm;

{
  /*interface NoteFormProps {
onClose: () => void;
}

const initialValues: NoteFormValues = {
title: "",
content: "",
tag: "Todo",
};

const validationSchema = Yup.object({
title: Yup.string()
.min(3, "Title must be at least 3 characters")
.max(50, "Title must be at most 50 characters")
.required("Title is required"),
content: Yup.string().max(500, "Content must be at most 500 characters"),
tag: Yup.string()
.oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
.required("Tag is required"),
});

const NoteForm = ({ onClose }: NoteFormProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
      toast.success("Note created successfuly");
    },
    onError: () => {
      toast.error("Failed to create note");
    },
  });

  const handleSubmit = (
    values: NoteFormValues,
    formikHelpers: FormikHelpers<NoteFormValues>
  ) => {
    mutate(values);
    formikHelpers.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default NoteForm;*/
}
