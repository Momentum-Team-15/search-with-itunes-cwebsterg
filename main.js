// declare variables for user-entered string & form of search box; create event listener
let userInput = document.querySelector(".search");
let form = document.querySelector("#search-box");
let urlBase = "https://proxy-itunes-api.glitch.me/search?term="
let trackPlay = document.getElementById("playback")

// add event listener for search text submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let artistNow = userInput.value;
  let url = `${urlBase}${artistNow}&entity=song&limit=20`
  appleMusicSearch(url);
    console.log("look at you you rock!");
    console.log(url);
    console.log(artistNow);
});

// create function using fetch to get music data from apple itunes api
function appleMusicSearch(url) {
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (songData) {
      searchResults(songData.results)  
      console.log(songData.results);
    });
}

// build search results grid in DOM
const results = document.querySelector("#results");
function searchResults(songList) {
  results.innerText = "";
  for (let song of songList) {

// create song container for individual results
  let trackDetails = document.createElement("div");
  trackDetails.classList.add('trackDetails');

  // create and write variables to song container in order of cover art, album title, artist, song title
  let trackAlbumCover = document.createElement("img");
  trackAlbumCover.classList.add("trackAlbumCover");
  trackAlbumCover.src = `${song.artworkUrl100}`;

  let trackAlbumTitle = document.createElement("div");
  trackAlbumTitle.classList.add("trackAlbumTitle");
  trackAlbumTitle.innerText = `${song.collectionName}`;

  let trackArtist = document.createElement("div");
  trackArtist.classList.add("trackArtist");
  trackArtist.innerText = `${song.artistName}`;

  let trackTitle = document.createElement("div");
  trackTitle.classList.add("trackTitle");
  trackTitle.innerText = `${song.trackName}`;

  // let playButton = document.createElement("button");
  // playButton.classList.add("playButton");

  trackDetails.addEventListener("click", (e) => {
    trackPlay.src = `${song.previewUrl}`;
    trackPlay.volume = 0.1;
  } )

  // write complete track details to individual div written to the searchResults div
  trackDetails.appendChild(trackAlbumCover);
  trackDetails.appendChild(trackAlbumTitle);
  trackDetails.appendChild(trackArtist);
  trackDetails.appendChild(trackTitle);
  // trackDetails.appendChild(playButton);
  results.appendChild(trackDetails);
}}
