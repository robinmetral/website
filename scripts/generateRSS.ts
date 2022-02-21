/**
 * This script generates an RSS2 feed from the markdown notes.
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import matter from "gray-matter";
import { Feed } from "feed";

const NOTES_DIR = "./pages/notes/";
const PUBLIC_DIR = "./public/";
const SITE_URL = "https://robinmetral.com";

type Note = {
  title: string;
  date: Date;
  url: string;
  content: string;
};

function generateFeed(notes: Note[]) {
  const lastNoteDate = notes[0].date;
  const feed = new Feed({
    title: "Robin Métral",
    description: "Robin's Feed",
    id: SITE_URL,
    link: SITE_URL,
    language: "en",
    updated: new Date(lastNoteDate),
    copyright: "",
    author: {
      name: "Robin Métral",
      email: "robin@metral.ch",
      link: SITE_URL,
    },
  });

  notes.forEach((note) => {
    feed.addItem({
      title: note.title,
      id: note.url,
      link: note.url,
      content: note.content,
      date: note.date,
      author: [
        {
          name: "Robin Métral",
          email: "robin@metral.ch",
          link: SITE_URL,
        },
      ],
    });
  });

  return feed.rss2();
}

function getNotes(files: string[]): Note[] {
  return files.map((file) => {
    const str = readFileSync(NOTES_DIR + file, "utf8");
    const frontmatter = matter(str).data;
    const { title, publishDate } = frontmatter as {
      title: string;
      publishDate: string;
    };
    const slug = `/notes/${file.slice(0, -3)}`;
    const url = SITE_URL + slug;
    return {
      title,
      date: new Date(publishDate),
      url,
      content: `<a href="${url}">${frontmatter.title}</a>`,
    };
  });
}

export default async function process() {
  const files = readdirSync(NOTES_DIR);
  const notes = getNotes(files);
  const sortedNotes = notes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const feed = generateFeed(sortedNotes);
  writeFileSync(PUBLIC_DIR + "feed.xml", feed, "utf8");
  console.log("Generated RSS feed.");
}
