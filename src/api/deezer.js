export async function searchDeezer(query) {
  const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}`;

  const proxied = `https://cors-anywhere.herokuapp.com/${url}`;

  const res = await fetch(proxied);
  const data = await res.json();

  return data.data || [];
}
