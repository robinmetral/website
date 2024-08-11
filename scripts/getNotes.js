import { cwd } from "process";
import { readdir, readFile } from "fs/promises";
import { load } from "js-yaml";

const NOTES_DIR = `${cwd()}/pages/notes`;

function getFrontmatter(file) {
  const match =
    /^---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/.exec(file);
  if (match) {
    return load(match[1]);
  } else {
    return {};
  }
}

export async function getNotes() {
  const files = await readdir(NOTES_DIR);
  const notes = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(`${NOTES_DIR}/${file}`, "utf-8");
      const frontmatter = getFrontmatter(content);
      return {
        title: frontmatter.title,
        published_date: frontmatter.published_date,
        slug: `/notes/${file.replace(".md", "")}/`,
        categories: frontmatter.categories,
      };
    })
  );
  return notes;
}

export async function buildPage(html) {
  try {
    const notes = await getNotes();
    const notesHtml = notes
      .sort(
        (a, b) =>
          new Date(b.published_date).getTime() -
          new Date(a.published_date).getTime()
      )
      .map(
        (note) => `<li data-categories="${
          note?.categories?.map((c) => c.name).join(" ") || ""
        }">
            <a href="${note.slug}">${
          note.title
        }</a> (<span class="sr-only">Published on </span><time datetime="${
          note.published_date
        }">${new Date(note.published_date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}</time>)
          </li>`
      )
      .join("");
    return html.replace("<li>Notes go here</li>", notesHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
