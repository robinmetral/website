import { cwd } from "process";
import { readdir, readFile } from "fs/promises";
import { load } from "js-yaml";

const NOTES_DIR = `${cwd()}/pages/notes`;

type Frontmatter = { [key: string]: string };

function getFrontmatter(file: string): Frontmatter {
  const match =
    /^---(?:\r?\n|\r)(?:([\s\S]*?)(?:\r?\n|\r))?---(?:\r?\n|\r|$)/.exec(file);

  if (match) {
    return load(match[1]) as Frontmatter;
  } else {
    return {};
  }
}

type Note = { title: string; publishDate: string; slug: string };

export async function getNotes(): Promise<Note[]> {
  const files = await readdir(NOTES_DIR);
  const notes: Note[] = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(`${NOTES_DIR}/${file}`, "utf-8");
      const frontmatter = getFrontmatter(content);
      return {
        title: frontmatter.title,
        publishDate: frontmatter.publishDate,
        slug: `/notes/${file.replace(".md", "")}/`,
      };
    })
  );
  return notes;
}

export async function buildPage(html: string): Promise<string> {
  try {
    const notes = await getNotes();
    const notesHtml = notes
      .sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      )
      .map(
        (note) =>
          `<li>
            <a href="${note.slug}">${
            note.title
          }</a> (<span class="sr-only">Published on </span><time datetime="${
            note.publishDate
          }">${new Date(note.publishDate).toLocaleDateString("en-US", {
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
