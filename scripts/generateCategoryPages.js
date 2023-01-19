/**
 * This script generates a page for each category added to a post's frontmatter.
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import matter from "gray-matter";

const NOTES_DIR = "./pages/notes/";
const CATEGORIES_DIR = "./pages/categories/";

/**
 * @typedef {Object} Note
 *
 * @property {string} title
 * @property {Date} date
 * @property {string} url
 */

/**
 * @param {string} category A note category
 * @param {Note[]} notes An array of notes in that category
 * @return {string} A category HTML page as a string
 */
function buildCategoryPage(category, notes) {
  // this more or less duplicates some of getNotes.js
  const notesHtml = notes
    .sort(
      // sort by date
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .map(
      // generate markup
      (note) => `<li>
      <a href="${note.url}">${
        note.title
      }</a> (<span class="sr-only">Published on </span><time datetime="${
        note.date
      }">${new Date(note.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}</time>)
    </li>`
    )
    .join("");

  // return HTML with frontmatter so category pages are picked up by the build script
  return `<!--
template: /templates/page.html
title: 'Notes in the "${category}" category'
-->
<h1>Notes in the "${category}" category</h1>
<ul>
${notesHtml}
</ul>
`;
}

/**
 * @param {string[]} files An array of note filepaths
 * @return {Object.<string, Note[]>} An object of categories and all notes belonging to them
 */
function getNotesByCategories(notePaths) {
  return notePaths.reduce((categories, notePath) => {
    const noteSource = readFileSync(NOTES_DIR + notePath, "utf8");
    const frontmatter = matter(noteSource).data;
    const { title, publishDate, categories: noteCategories } = frontmatter;
    const noteUrl = `/notes/${notePath.replace(".md", "")}/`;
    const note = { title, date: publishDate, url: noteUrl };

    noteCategories?.forEach((c) => {
      const category = c.name; // since categories are an array of object in frontmatter, we get c.name
      if (categories[category]) {
        return (categories[category] = [...categories[category], note]);
      }
      return (categories[category] = [note]);
    });
    return categories;
  }, {});
}

export default async function process() {
  const notePaths = readdirSync(NOTES_DIR);
  const categories = getNotesByCategories(notePaths);
  Object.entries(categories).forEach(([category, notes]) => {
    const html = buildCategoryPage(category, notes);
    writeFileSync(CATEGORIES_DIR + category + ".html", html, "utf8");
  });
  console.log("Generated category pages.");
}
