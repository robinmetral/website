/**
 * This script generates an RSS2 feed from the markdown notes.
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import matter from "gray-matter";
import { Feed } from "feed";

const NOTES_DIR = "./pages/notes/";
const PUBLIC_DIR = "./public/";
const SITE_URL = "https://robinmetral.com";

/**
 * @typedef {Object} Note
 *
 * @property {string} title
 * @property {Date} date
 * @property {string} url
 * @property {string} content
 */

/**
 * @param {Note[]} notes An array of notes to turn into a feed
 * @return {string} RSS feed as a string
 */
function generateFeed(notes) {
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

function getNotes(files) {
  return files.map((file) => {
    const str = readFileSync(NOTES_DIR + file, "utf8");
    const frontmatter = matter(str).data;
    const { title, publishDate } = frontmatter;
    const slug = `/notes/${file.replace(".md", "")}/`;
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
