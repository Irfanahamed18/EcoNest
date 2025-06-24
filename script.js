const usersContainer = document.getElementById('users');

fetch('https://jsonplaceholder.typicode.com/users?_limit=6')
  .then(res => res.json())
  .then(users => {
    users.forEach(user => {
      const card = document.createElement('div');
      card.className = 'user-card';
      card.innerHTML = `
        <img src="https://robohash.org/${user.id}?size=200x200" alt="${user.name}">
        <h3>${user.name}</h3>
        <p>${user.company.name}</p>
        <a href="user.html?id=${user.id}">View Profile →</a>
      `;
      usersContainer.appendChild(card);
    });
  });
