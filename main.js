// declare variables for user-entered string & form of search box; create event listener
let userInput = document.querySelector(".search");
let form = document.querySelector("#search-box");
let urlBase = "https://proxy-itunes-api.glitch.me/search?term="
let trackPlay = document.getElementById("playback")

// add event listener for search text submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let artistNow = userInput.value;
  let url = `${urlBase}${artistNow}&entity=song&limit=27`
  appleMusicSearch(url);
  console.log(url);
})

// create function using fetch to get music data from apple itunes api
function appleMusicSearch(url) {
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then(function (response) {
      return response.json();
      console.log("wtf");
    })
    .then(function (songData) {
      searchResults(songData.results)
      if (songData.results.length === 0) {
        alert("No songs found but please try again!")
      }  
      console.log(songData.results);
    });
}


// build search results grid in DOM

let results = document.querySelector(".results");
const libraryDiv = document.querySelector("#libraryDiv");
function searchResults(songList) {
  results.innerText = "";
  firstFrame.innerText = "";
  libraryDiv.innerText = "";
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
  trackAlbumTitle.innerText = `${song.collectionName} (rel. ${moment(song.releaseDate).format("YYYY")})`;

  let trackArtist = document.createElement("div");
  trackArtist.classList.add("trackArtist");
  trackArtist.innerText = `${song.artistName}`;

  let trackTitle = document.createElement("div");
  trackTitle.classList.add("trackTitle");
  trackTitle.innerText = `${song.trackName}`;

  trackDetails.addEventListener("click", (e) => {
    trackPlay.src = `${song.previewUrl}`;
    trackPlay.volume = 0.1;
  } )

  // write complete track details to individual div written to the searchResults div
  trackDetails.appendChild(trackAlbumCover);
  trackDetails.appendChild(trackArtist);
  trackDetails.appendChild(trackAlbumTitle);
  trackDetails.appendChild(trackTitle);
  results.appendChild(trackDetails)
}}



// load iframe into page when just play link is clicked requiring clearing of results div
let url = "https://www.youtube.com/embed/fI5_O0LqFBI?start=65;&autoplay=1&mute=1"
let first = document.getElementById("first")
first.addEventListener("click", (e) => {
  const firstFrame = document.querySelector("#firstFrame");
  results.innerText = "";
  firstFrame.innerText = "";
  libraryDiv.innerText = "";
  let newFrame = document.createElement("IFRAME");
  let frameButton = document.createElement("button");
  frameButton.innerText = "Clear";
  console.log("frame made");
  newFrame.src = url
  console.log(url);
  firstFrame.appendChild(frameButton);
  firstFrame.appendChild(newFrame);
  // add event listener to clear the iframe off page
  frameButton.addEventListener("click", (e) => {
    firstFrame.innerText = "";
  })
})

// load image onto page when My Library link clicked
let library = document.getElementById("library");
library.addEventListener("click", (e) => {

  results.innerText = "";
  firstFrame.innerText = "";
  libraryDiv.innerText = "";
  let imgDiv = document.createElement("img")
  imgDiv.classList.add("libraryImg")
  let imgButton = document.createElement("button")
  imgButton.innerText = "Clear";
  imgDiv.src = "http://127.0.0.1:8080/resources/mylibrary.jpg"
  libraryDiv.appendChild(imgButton);
  libraryDiv.appendChild(imgDiv);
    // add event listener to clear the image off page
    imgButton.addEventListener("click", (e) => {
      libraryDiv.innerText = "";
    })
})