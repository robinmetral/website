/**
 * Finds the note's publishDate and formats it
 */
function formatDate(html: string, isoDate: string): string {
  const formattedDate = new Date(isoDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  /**
   * We match an iso string between the >< characters to avoid transforming
   * the iso string passed as `datetime` to the `time` element.
   */
  return html.replace(/>\d{4}-\d{2}-\d{2}</, `>${formattedDate}<`);
}

export async function buildPage(
  html: string,
  frontmatter: { [key: string]: string }
): Promise<string> {
  try {
    return formatDate(html, frontmatter.publishDate);
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
