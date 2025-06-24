const main = document.getElementById('user-profile');
const params = new URLSearchParams(location.search);
const userId = params.get('id');

async function renderUser() {
  const [user, posts, albums] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(r => r.json()),
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=6`).then(r => r.json()),
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}&_limit=6`).then(r => r.json()),
  ]);

  main.innerHTML = `
    <section class="user-card center">
      <img src="https://robohash.org/${user.id}?size=200x200" alt="${user.name}">
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Company:</strong> ${user.company.name}</p>
      <p><strong>City:</strong> ${user.address.city}</p>
    </section>

    <section class="posts">
      <h2>Posts</h2>
      ${posts.map(p => `
        <div class="post-card">
          <h4>${p.title}</h4>
          <p>${p.body}</p>
          <a href="post.html?id=${p.id}">View Comments</a>
        </div>
      `).join('')}
    </section>

    <section class="albums">
      <h2>Albums</h2>
      ${albums.map(a => `
        <div class="album-card">
          <h4>${a.title}</h4>
          <a href="album.html?id=${a.id}">
            <img src="https://via.placeholder.com/150" alt="${a.title}">
          </a>
        </div>
      `).join('')}
    </section>
  `;
}
renderUser();
