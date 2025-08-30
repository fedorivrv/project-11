// import { getArtist, getArtistAlbums } from './api.js';

  const backdrop = document.getElementById('artist-modal-backdrop');
  const modal = document.getElementById('artist-modal');
  const closeBtn = document.getElementById('artist-close-btn');
  const loader = document.getElementById('artist-loader');
  const content = document.getElementById('artist-content');

  let escListener;
  let outsideClickListener;

   // Відкрити модальне вікно
  export async function openArtistModal(artistId) {
    backdrop.classList.remove('hidden');
    loader.classList.remove('hidden');
    content.classList.add('hidden');
    document.body.style.overflow = 'hidden';

    try {
      const artist = await getArtist(artistId);
      const albums = await getArtistAlbums(artistId);
      renderArtist(artist, albums);
    } catch (err) {
      content.innerHTML = `<p>Error loading artist.</p>`;
    } finally {
      loader.classList.add('hidden');
      content.classList.remove('hidden');
    }
    // Додати слухачів подій  // Закриття по Escape
    escListener = (e) => { if (e.key === 'Escape') closeArtistModal(); };
    document.addEventListener('keydown', escListener);

    // Закриття по кліку поза модалкою
    outsideClickListener = (e) => {
      if (e.target === backdrop) closeArtistModal();
    };
    backdrop.addEventListener('click', outsideClickListener);
  }
   // Закрити модальне вікно
  export function closeArtistModal() {
    backdrop.classList.add('hidden');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', escListener);
    backdrop.removeEventListener('click', outsideClickListener);
  }

  closeBtn.addEventListener('click', closeArtistModal);

 // Рендер артиста
  function renderArtist(artist, albums) {
    const yearsActive = artist.startYear && artist.endYear
      ? `${artist.startYear} - ${artist.endYear}`
      : artist.startYear && !artist.endYear
        ? `${artist.startYear} - present`
        : 'information missing';

    content.innerHTML = `
      <div class="artist-header">
        <h2>${artist.name}</h2>
        <img src="${artist.image || ''}" alt="${artist.name}">
        <p><b>Years active:</b> ${yearsActive}</p>
        ${artist.sex ? `<p><b>Sex:</b> ${artist.sex}</p>` : ''}
        ${artist.members ? `<p><b>Members:</b> ${artist.members}</p>` : ''}
        ${artist.country ? `<p><b>Country:</b> ${artist.country}</p>` : ''}
        <p><b>Biography:</b> ${artist.biography || '—'}</p>
        <p><b>Genres:</b> ${(artist.genres || []).join(', ')}</p>
      </div>
      <div class="albums">
        <h3>Albums</h3>
        ${albums.map(album => `
          <div class="album">
            <div class="album-title">${album.name} (${album.year})</div>
            <table>
              <thead>
                <tr><th>Title</th><th>Duration</th><th>Link</th></tr>
              </thead>
              <tbody>
                ${album.tracks.map(track => `
                  <tr>
                    <td>${track.name}</td>
                    <td>${track.duration || '-'}</td>
                    <td>
                      ${track.youtube ? `<a href="${track.youtube}" target="_blank" class="yt-link">▶</a>` : ''}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        `).join('')}
      </div>
    `;
  }

