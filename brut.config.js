export default {
  collections: ["notes"],
  processContext: (context) => {
    const notesWithFormattedDate = context.notes.map((note) => {
      const publishedDate = new Date(note.frontmatter.published_date);
      // add the formatted date under frontmatter as published_date_string
      // we keep published_date because we need it for the HTML time element's datetime attribute
      note.frontmatter.published_date_string = publishedDate.toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      note.frontmatter.published_date_iso = publishedDate.toISOString();
      return note;
    });
    context.notes = notesWithFormattedDate;
    // last 10 notes for homepage
    context.notes_last_ten = context.notes.slice(0, 10);
    // last 30 notes for feed
    context.notes_last_thirty = context.notes.slice(0, 30);
    // ISO date for Atom feed
    context.updated_date_iso = context.notes[0].frontmatter.published_date_iso;
    return context;
  },
};
