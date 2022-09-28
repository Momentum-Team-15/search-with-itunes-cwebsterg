//returns only the data on artwork with id provided in get url
const url = 'https://api.artic.edu/api/v1/artworks/28067'
// returns the first 10 results on page 2
// const url = 'https://api.artic.edu/api/v1/artworks?page=2&limit=10'
//returns all artwork data
// const url = 'https://api.artic.edu/api/v1/artworks'
// returns the fields listed in string (fields=)
// const url = 'https://api.artic.edu/api/v1/artworks?fields=id,title,artist_display,date_display,main_reference_number'
// full text search for all artworks whose metadata contains cats
// const url = 'https://api.artic.edu/api/v1/artworks/search?q=cats'
// same search but only artworks in public domain
// const url = 'https://api.artic.edu/api/v1/artworks/search?q=cats&query[term][is_public_domain]=true'

fetch(url,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
})
// when you get a response back from the fetch, do something with it
// we are naming the response `response` but it could be taylor
.then(function(response){
    //parse the response
    return response.json()
})
// take what just got returned (response.json()) and do something with it
// we assign resopnse.json() to variable `parsedResponse`
.then(function(parsedResponse){
    let artwork = parsedResponse.data
        console.log(`${artwork.title} by ${artwork.artist_title}`)
})