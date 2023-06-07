var showAll = false;

function toggleDetails(event) {
  const li = event.target;
  const details = li.nextElementSibling;
  details.style.display = details.style.display === 'none' ? 'block' : 'none';
}

function toggleSongs() {
  const songList = document.getElementById('songList');
  const toggleButton = document.getElementById('toggleButton');

  showAll = !showAll;

  if (showAll) {
    songList.classList.add('show-all');
    toggleButton.textContent = 'Hide Songs';
  } else {
    songList.classList.remove('show-all');
    toggleButton.textContent = 'Toggle Songs';
  }
}

function toggleForm() {
  const form = document.getElementById('songForm');
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
}
async function addSong() {
  const artist = document.getElementById('artist').value;
  const album = document.getElementById('album').value;
  const title = document.getElementById('title').value;
  const length = parseInt(document.getElementById('length').value);
  const track = parseInt(document.getElementById('track').value);

  try {
    await axios
      .post('/song', {
        artist,
        album,
        title,
        length,
        track,
      })
      .then((response) => {
        const savedSong = response.data;
        console.log(savedSong);
        // Handle the saved song object as needed
      })
      .catch((error) => {
        console.error(error);
        // Handle the error if necessary
      });
  } catch (error) {
    console.error(error);
    // Handle the error if necessary
  }
}
