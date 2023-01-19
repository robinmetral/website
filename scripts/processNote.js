function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function buildPage(html, frontmatter) {
  try {
    html = html
      /**
       * Format date.
       * We match an iso string between the >< characters to avoid transforming
       * the iso string passed as `datetime` to the `time` element.
       */
      .replace(
        />\d{4}-\d{2}-\d{2}</,
        `>${formatDate(frontmatter.publishDate)}<`
      )
      /**
       * Format note categories.
       * We match categories by the [[CATEGORIES]] substring in the html, and
       * replace them by links to the proper categories pages.
       */
      .replace(/\[\[CATEGORIES(.+)\]\]/, (match, p1) =>
        p1
          .split(",")
          .map(
            (category) => `<a href="/categories/${category}">${category}</a>`
          )
          .join(", ")
      );
    return html;
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
