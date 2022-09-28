// declare variables for user-entered string & form of search box; create event listener
let userInput = document.querySelector(".search");
let form = document.querySelector("#search-box");

// add event listener for search text submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let artistNow = userInput.value;
  let url = `"https://proxy-itunes-api.glitch.me/search?term=${artistNow}&limit=10`
  appleMusicSearch(url);
  //   console.log("look at you you rock!");
  //   console.log(event);
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
      searchResults  
      console.log(songData.results);
    });
}

// build search results grid in DOM
function searchResults(songArray) {
for (let song of songArray) {

// create song container for individual results
  let trackDetails = document.createElement("div");
  trackDetails.classList.add('trackDetails');

  // create and write variables to song container in order of cover art, album title, artist, song title
  let trackAlbumCover = document.createElement("img");
  trackAlbumCover.classList.add("trackAlbumCover");
  trackAlbumCover.src = songData.artworkUrl00;

  let trackAlbumTitle = document.createElement("div");
  trackAlbumTitle = document.createElement("div");
  trackAlbumTitle.innerText = songData.trackAlbumTitle;

  let trackArtist = document.createElement("div");
  trackArtist.classList.add("trackArtist");
  trackArtist.innerText = songData.artistName;

  let trackTitle = document.createElement("div");
  trackTitle.classList.add("trackTitle");
  trackTitle.innerText = songData.trackName;

  let playButton = document.createElement("button");
  playButton.classList.add("playButton");

  // write complete track details to individual div written to the searchResults div
  trackDetails.appendChild(trackAlbumCover);
  trackDetails.appendChild(trackAlbumTitle);
  trackDetails.appendChild(trackArtist);
  trackDetails.appendChild(trackTitle);
  trackDetails.appendChild(playButton);
  searchResults.appendChild(trackDetails);
}}
