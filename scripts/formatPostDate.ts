export async function buildPage(
  html: string,
  frontmatter: { [key: string]: string }
): Promise<string> {
  try {
    return html.replace(
      `>${frontmatter.publishDate}<`,
      `>${new Date(frontmatter.publishDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}<`
    );
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
