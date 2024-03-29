const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const API_URI = 'https://api.lyrics.ovh';

// Search by song or artists

async function searchSongs(term) {
    const res = await fetch(`${API_URI}/suggest/${term}`);
    const data = await res.json();
    console.log(data);
    showData(data);
}

// Show songs and artists in DOM
function showData(data) {
    result.innerHTML = `
      <ul class="songs">
        ${data.data
            .map(
                (song) => `<li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
      </li>`
            )
            .join('')}
      </ul>
    `;

    if (data.prev || data.next) {
        more.innerHTML = `
        ${
            data.prev
                ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
                : ''
        }
        ${
            data.next
                ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
                : ''
        }
    `;
    } else {
        more.innerHTML = '';
    }
}

// Get prev and next songs
async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();

    showData(data);
}

// get lyrics

async function getLyrics(artist, songTitle) {
    const res = await fetch(`${API_URI}/v1/${artist}/${songTitle}`);
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
        <span>
            ${lyrics}
        </span>
    `;

    more.innerHTML = '';
}

// Addding Event listeneres

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value.trim();

    if (!searchTerm) {
        alert('Please type a search term');
    } else {
        searchSongs(searchTerm);
    }

    search.value = '';
});

// Get lyrics buttons clicks

result.addEventListener('click', (e) => {
    const clickedElement = e.target;

    if (clickedElement.tagName === 'BUTTON') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }
});
