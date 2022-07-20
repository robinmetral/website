function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function buildPage(
  html: string,
  frontmatter: { [key: string]: string }
): Promise<string> {
  try {
    /**
     * Format date.
     * We match an iso string between the >< characters to avoid transforming
     * the iso string passed as `datetime` to the `time` element.
     */
    html = html.replace(
      />\d{4}-\d{2}-\d{2}</,
      `>${formatDate(frontmatter.publishDate)}<`
    );
    return html;
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
