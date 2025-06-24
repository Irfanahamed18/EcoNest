const main = document.getElementById('user-post');
const postId = new URLSearchParams(location.search).get('id');

async function renderPostComments() {
  const [post, comments] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`).then(r => r.json()),
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`).then(r => r.json()),
  ]);

  main.innerHTML = `
    <section class="section">
      <h2>Comments for: ${post.title}</h2>
      <div class="comments-table">
        ${comments.map(c => `
          <div class="comment-row">
            <div><strong>${c.name}</strong> (${c.email})</div>
            <div>${c.body}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}
renderPostComments();
