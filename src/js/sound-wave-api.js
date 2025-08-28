import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api/';
let DATA_PASS;

export async function getGenres() {
  try {
    DATA_PASS = 'genres';
    const res = await axios.get(DATA_PASS, {});

    const genres = res.data;
    if (genres && Array.isArray(genres) && genres.length > 0) {
      return genres;
    } else {
      return noDataIzT(DATA_PASS);
    }
  } catch (error) {
    errorApiIzT(error);
  }
}

export async function getArtists({ name, page = 1, sortName, genre } = {}) {
  DATA_PASS = 'artists';
  const params = {
    limit: 8,
    page: page,
    name,
    sortName,
    genre,
  };
  try {
    const res = await axios.get(DATA_PASS, { params });

    const artists = res.data.artists;
    if (artists && Array.isArray(artists) && artists.length > 0) {
      console.log(artists);
      return artists;
    } else {
      return noDataIzT(DATA_PASS);
    }
  } catch (error) {
    errorApiIzT(error);
  }
}

export async function getArtistAlbums(id) {
  try {
    DATA_PASS = `artists/${id}/albums`;
    const res = await axios.get(DATA_PASS, {});

    const artistAlbums = res.data.albumsList;
    if (
      artistAlbums &&
      Array.isArray(artistAlbums) &&
      artistAlbums.length > 0
    ) {
      return artistAlbums;
    } else {
      return noDataIzT('artist albums');
    }
  } catch (error) {
    errorApiIzT(error);
  }
}

export async function getArtist(id) {
  try {
    DATA_PASS = `artists/${id}`;
    const res = await axios.get(DATA_PASS, {});

    const artist = res.data;
    if (artist) {
      return artist;
    } else {
      return noDataIzT('artist');
    }
  } catch (error) {
    errorApiIzT(error);
  }
}

export async function getRandomPageFeedbacks() {
  try {
    DATA_PASS = 'feedbacks';
    const fullFeedbacks = await axios.get(DATA_PASS, {});
    const MAX_PAGE = Math.ceil(fullFeedbacks.data.data.length / 10);
    const page = getRandomInt(MAX_PAGE);
    const params = {
      limit: 10,
      page: page,
    };
    const res = await axios.get(DATA_PASS, { params });

    const feedbacks = res.data.data;
    if (feedbacks && Array.isArray(feedbacks) && feedbacks.length > 0) {
      return feedbacks;
    } else {
      return noDataIzT(DATA_PASS);
    }
  } catch (error) {
    errorApiIzT(error);
  }
}

export async function postFeedback(nameArtist, ratingArtist, descArtist) {
  const newFeedback = {
    name: nameArtist,
    rating: ratingArtist,
    descr: descArtist,
  };

  DATA_PASS = 'feedbacks';

  await axios
    .post(DATA_PASS, newFeedback)
    .then(response => {
      iziToast.success({
        message: response.data.message,
        position: 'topRight',
        messageColor: 'white',
        titleColor: 'white',
      });
    })
    .catch(error => {
      errorApiIzT(error);
    });
}

function noDataIzT() {
  iziToast.show({
    title: '❌',
    message: `Sorry, there are no ${DATA_PASS}.`,
    color: 'red',
    position: 'topRight',
    messageColor: 'white',
    titleColor: 'white',
  });
}

function errorApiIzT(error) {
  iziToast.show({
    title: 'Error',
    color: 'red',
    position: 'topRight',
    messageColor: 'white',
    titleColor: 'white',
    message: error.message,
  });
}

function getRandomInt(n) {
  return Math.floor(Math.random() * n) + 1;
}
