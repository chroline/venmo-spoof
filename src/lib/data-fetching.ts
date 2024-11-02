export async function fetchHtml(url: string) {
  try {
    // Send a GET request with headers to mimic a browser request
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.text();
  } catch (error) {
    return null;
  }
}

export async function getAvatarURL(username: string) {
  const response = await fetch(`/api/get-avatar-url?username=${username}`);
  const data = await response.json();
  return data.avatarURL;
}

export async function getName(username: string) {
  const response = await fetch(`/api/get-name?username=${username}`);
  const data = await response.json();
  return data.name;
}
