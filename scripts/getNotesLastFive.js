import { getNotes } from "./getNotes";

export async function buildPage(html) {
  try {
    const notes = await getNotes();
    const notesHtml = notes
      .sort(
        (a, b) =>
          new Date(b.published_date).getTime() -
          new Date(a.published_date).getTime()
      )
      .slice(0, 5)
      .map((note) => `<li><a href="${note.slug}">${note.title}</a></li>`)
      .join("");
    return html.replace("<li>Notes go here</li>", notesHtml);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
