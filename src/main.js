import { createArtists } from './js/render-functions';
import { errorApiIzT, getArtists } from './js/sound-wave-api';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const artists = await getArtists({});
    if (artists.length > 0) {
      createArtists(artists);
    }
  } catch (error) {
    errorApiIzT(error);
  }
});
