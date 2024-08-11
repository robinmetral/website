export default {
  collections: ["notes"],
  processContext: (context) => {
    const notesWithFormattedDate = context.notes.map((note) => {
      const formattedDate = new Date(
        note.frontmatter.published_date
      ).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      // add the formatted date under frontmatter as published_date_string
      // we keep published_date because we need it for the HTML time element's datetime attribute
      note.frontmatter.published_date_string = formattedDate;
      return note;
    });
    context.notes = notesWithFormattedDate;
    return context;
  },
};
