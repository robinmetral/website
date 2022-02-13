import { getNotes } from "./getNotes";

export async function buildPage(html: string): Promise<string> {
  try {
    const notes = await getNotes();
    const notesHtml = notes
      .sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      )
      .slice(0, 5)
      .map(
        (note) =>
          `<li class="note text-large"><a href="${note.slug}">${note.title}</a></li>`
      )
      .join("");
    return html.replace("<li>Notes go here</li>", notesHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
