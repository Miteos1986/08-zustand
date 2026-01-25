import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found | NoteHub",
  description: "The page you are looking for does not exist in NoteHub.",

  openGraph: {
    title: "Page not found | NoteHub",
    description: "This page does not exist in the NoteHub application.",
    url: "http://localhost:3000/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub – Page not found",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
