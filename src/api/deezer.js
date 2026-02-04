export async function searchItunes(query) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(
    query
  )}&media=music&entity=song&limit=50`;

  try {
    const res = await fetch(url);
    const json = await res.json();
    const results = json.results || [];

    return results.map((item) => {
      const small = item.artworkUrl100 || "";
      const large = small
        .replace("100x100bb", "600x600bb")
        .replace("100x100", "600x600");

      return {
        id: item.trackId,
        title: item.trackName,
        preview: item.previewUrl,
        duration: item.trackTimeMillis
          ? Math.round(item.trackTimeMillis / 1000)
          : null,

        artist: {
          name: item.artistName,
        },

        album: {
          title: item.collectionName,
          cover_big: large,
          cover_medium: small,
          cover: small,
        },

        raw: item,
      };
    });
  } catch (err) {
    console.error("iTunes API error:", err);
    return [];
  }
}
