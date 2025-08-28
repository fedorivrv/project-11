function templateImage(artist) {
  const { _id, genres, strArtist, strBiographyEN, strArtistThumb } = artist;
  let genresMarkup;
  if (Array.isArray(genres) || genres.length !== 0) {
    genresMarkup = genres
      .map(genre => {
        return `<li class="genre-artist">${genre}</li>`;
      })
      .join('\n');
  }

  return `<li class="item-artists" data-id-${_id}>
        <img class="img-artist" src="${strArtistThumb}" alt="${strArtist}" />
        <div class="info-artist">
          <ul class="genres-artist">
            ${genresMarkup}
          </ul>
          <h3 class="name-artist">${strArtist}</h3>
          <p class="desc-artist">${strBiographyEN}</p>
        </div>
        <button class="learn-more-artist">
          Learn More
          <svg class="icon-learn-more" width="24" height="24">
            <use href=""></use>
          </svg>
        </button>
      </li>
`;
}

function templatesArtist(artists) {
  return artists.map(templateImage).join('\n');
}

export function createArtists(artists) {
  const ulElem = document.querySelector('.list-artists');
  const markup = templatesArtist(artists);
  //   console.log(markup);
  ulElem.insertAdjacentHTML('afterbegin', markup);
}
