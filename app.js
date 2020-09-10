let superHeroApiKey = "3352034491530724";
let marvelKey = "15286a61235a0d799192d631d8680094";
let privateKey = "ac274b24a1dfe44ebcf7d83582f542f4c019c21d";

let searchUrl = "https://www.googleapis.com/books/v1/volumes";

let googleBooksKey = "AIzaSyAb0qUW7_6r4aYk0xb7tLguRXE2d3rUIbI";







function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    // if there are previous results, remove them
    console.log(responseJson);
    $('#results-list').empty();
    // iterate through the items array
    for (let i = 0; i < responseJson.items.length; i++){
        // for each object in the items
        //array, add a list item to the results
        //list with the video title, description,
        //and thumbnail
        
        $('#results-list').append(

`
<li><h3 class="comic-title">${responseJson.items[i].volumeInfo.title}</h3>

<button type="button" class="collapsible"><img src='${responseJson.items[i].volumeInfo.imageLinks.thumbnail}'></button>
<div class="content">
<p >${responseJson.items[i].volumeInfo.description}</p>
</div>
`

    //         `
            

    //   <img src='${responseJson.items[i].volumeInfo.imageLinks.thumbnail}'>
    //   </li>`
        )};
    //display the results section
    var coll = document.getElementsByClassName("collapsible");
    var i;
    
    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
    $('#results').removeClass('hidden');
};
function collapsible(){

}

function fetchData(query) {

    const params = {
       
        q: query,
        
     };

    const queryString = formatQueryParams(params)
    const url = searchUrl + "?" + queryString;



fetch(url)
.then(response => {
    if (response.ok) {
        return response.json();
    }
    throw new Error(response.statusText);
})
.then(responseJson => displayResults(responseJson))
.catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
});
console.log(url);

 }





function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchCharacter = $('#js-search-character').val();
        collapsible();
        fetchData(searchCharacter);
        
    });
}

watchForm();