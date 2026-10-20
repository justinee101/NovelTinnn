
const body = document.body;
const themeBtn = document.getElementById('themeBtn');

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  themeBtn.textContent = 'Light';
}

themeBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? 'Light' : 'Dark';
});

// ---------- Feature 2: Genre filter + search (home page) ----------
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
const search = document.getElementById('search');
let genre = 'All';

function filterCards() {
  const query = search.value.toLowerCase().trim();
  let shown = 0;

  cards.forEach((card) => {
    const matchGenre = genre === 'All' || card.dataset.genre === genre;
    const matchText = card.dataset.title.includes(query);
    const visible = matchGenre && matchText;

    card.hidden = !visible;
    card.style.display = visible ? '' : 'none';
    if (visible) shown++;
  });

  const empty = document.getElementById('empty');
  if (empty) empty.hidden = shown > 0;
}

if (search) {
  search.addEventListener('input', filterCards);

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      genre = chip.dataset.f;
      filterCards();
    });
  });
}

// ---------- Feature 3: Like button (saved per story) ----------
const likeBtn = document.querySelector('.like');

if (likeBtn) {
  const key = 'like-' + likeBtn.dataset.id;

  function setLiked(liked) {
    likeBtn.classList.toggle('liked', liked);
    likeBtn.firstChild.textContent = liked ? 'Liked ' : 'Like ';
    likeBtn.querySelector('span').textContent = liked ? 1 : 0;
  }

  setLiked(localStorage.getItem(key) === '1');

  likeBtn.addEventListener('click', () => {
    const liked = localStorage.getItem(key) !== '1';
    localStorage.setItem(key, liked ? '1' : '0');
    setLiked(liked);
  });
}

// ---------- Feature 4: Show / Hide synopsis ----------
const synBtn = document.getElementById('synBtn');
const synopsis = document.getElementById('synopsis');

if (synBtn) {
  synBtn.addEventListener('click', () => {
    synopsis.hidden = !synopsis.hidden;
    synBtn.textContent = synopsis.hidden ? 'Show Synopsis' : 'Hide Synopsis';
  });
}

// ---------- Feature 5: Reading progress bar ----------
const progress = document.getElementById('progress');

if (progress) {
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const percent = total > 0 ? (window.scrollY / total) * 100 : 100;
    progress.style.width = percent + '%';
  });
}