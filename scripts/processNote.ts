import fetch from "node-fetch";

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Type adapted from https://webmention.io/api/mentions.jf2?target=https://robinmetral.com/
 */
type Comment = {
  type: "entry";
  author: {
    type: "card";
    name: string;
    photo: string;
    url: string;
  };
  url: string;
  published: string;
  "wm-received": string;
  "wm-id": number;
  "wm-source": string;
  "wm-target": string;
  name: string;
  content: {
    html: string;
    text: string;
  };
  "in-reply-to": string;
  "wm-property": "in-reply-to";
  "wm-private": false;
};

async function fetchComments(path: string) {
  const url = `https://robinmetral.com${path}`;
  const res = await fetch(
    `https://webmention.io/api/mentions.jf2?target=${url}&wm-property=in-reply-to`
  );
  if (!res.ok) {
    throw new Error(`Couldn't fetch webmentions for ${path}`);
  }
  const data = (await res.json()) as {
    type: "feed";
    name: "Webmentions";
    children: Comment[];
  };
  return data.children;
}

export async function buildPage(
  html: string,
  frontmatter: { [key: string]: string },
  path: string
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
    /**
     * fetch webmentions
     */
    const comments = await fetchComments(path);
    if (comments.length) {
      html = html.replace(
        "__COMMENTS__",
        `<ul>${comments
          .map(
            (c) =>
              `<li><p><a href="${c.author.url}">${
                c.author.name
              }</a> replied on ${formatDate(c.published)} (<a href="${
                c.url
              }">permalink</a>)</p><p>${c.content.text}</p></li>`
          )
          .join("")}</ul>`
      );
    } else {
      html = html.replace("__COMMENTS__", `<p>No comments yet.</p>`);
    }
    return html;
  } catch (error) {
    throw new Error(`Failed to build page: ${error}`);
  }
}
