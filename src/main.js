import {
  checkVisibleLoadBtn,
  createArtists,
  updateArtists,
} from './js/render-functions';
import { errorApiIzT, getArtists } from './js/sound-wave-api';
const btnLdMrEl = document.querySelector('.load-more');
let page = 1;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // функція включення лоудера
    const artists = await getArtists({});
    if (artists.length > 0) {
      createArtists(artists);
    }
  } catch (error) {
    errorApiIzT(error);
  } finally {
    //функція виключення лоудера
  }
});

btnLdMrEl.addEventListener('click', async e => {
  page += 1;
  try {
    // функція включення лоудера
    const artists = await getArtists({ page });
    if (artists.length > 0) {
      updateArtists(artists);
    }
  } catch (error) {
    errorApiIzT(error);
  } finally {
    //функція виключення лоудера
    checkVisibleLoadBtn(page);
  }
});
