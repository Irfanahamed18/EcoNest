const main = document.getElementById('user-album');
const albumId = new URLSearchParams(location.search).get('id');

async function renderAlbumPhotos() {
  const [album, photos] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`).then(r => r.json()),
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_limit=10`).then(r => r.json()),
  ]);

  main.innerHTML = `
    <section class="section">
      <h2>Photos in: ${album.title}</h2>
      <div class="album-gallery">
        ${photos.map(photo => `
          <img src="${photo.url}" alt="${photo.title}" />
        `).join('')}
      </div>
    </section>
  `;
}
renderAlbumPhotos();
