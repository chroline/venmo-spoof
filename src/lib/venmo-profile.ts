function decodeHtmlEntities(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function getAttribute(tag: string, attribute: string) {
  const match = tag.match(
    new RegExp(`\\b${attribute}\\s*=\\s*(["'])(.*?)\\1`, "i")
  );

  return match ? decodeHtmlEntities(match[2]) : null;
}

export function getVenmoName(html: string) {
  const match = html.match(
    /<p\b[^>]*class=["'][^"']*profileInfo_username[^"']*["'][^>]*>(.*?)<\/p>/i
  );

  if (!match) return null;

  const name = decodeHtmlEntities(match[1].replace(/<[^>]+>/g, "")).trim();
  return name || null;
}

export function getVenmoAvatarURL(html: string) {
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const className = getAttribute(tag, "class");

    if (className?.split(/\s+/).includes("MuiAvatar-img")) {
      return getAttribute(tag, "src");
    }
  }

  const ogImage = html.match(
    /<meta\b[^>]*property=["']og:image["'][^>]*>/i
  )?.[0];

  return ogImage ? getAttribute(ogImage, "content") : null;
}
