// fetch necessary UI elements
const searchInput = document.querySelector("#search-bar-container .search-box input");
const searchResultsBox = document.querySelector("#search-bar-container .search-results");

searchInput.addEventListener('input',fetchMovieInfo);

// fetch movie information
function fetchMovieInfo(e) {
    fetch('https://www.omdbapi.com/?apikey=b523fdba&s='+e.target.value)
    .then(res=>res.json())
    .then((data)=>{
        if(data.Response !== 'False') {
            addToSeachResultsBox(data.Search);
        } else {
            clearSearchResultsBox();
        }
    });
}

// clear child nodes of search results box
function clearSearchResultsBox() {
    while(searchResultsBox.childNodes.length) {
        searchResultsBox.childNodes[0].remove();
    }
}

// Reflect movie results from API in UI
function addToSeachResultsBox(movieResponses) {
    // clear all prev child nodes
    clearSearchResultsBox();

    // display current child nodes
    for(let i=0; i < movieResponses.length; i++) {
        let result = document.createElement('div');
        let movieTitle = document.createElement('div');
        let favCheckBox = document.createElement('input');

        movieTitle.textContent = movieResponses[i].Title;
        movieTitle.style.backgroundColor = 'transparent';

        favCheckBox.type="checkbox";
        favCheckBox.addEventListener('click', addRemoveMovieToFavList);

        result.setAttribute('data-imdb-id',movieResponses[i].imdbID);
        result.addEventListener('click',openMoviePage);
        result.append(movieTitle,favCheckBox);

        searchResultsBox.append(result);

        if(i > 9) {
            break;
        }
    }

    // call this function to check if the movie results in UI are in favourite list or not
    checkIfResultsAreInFavList(searchResultsBox);
}

// check if the movie results in UI are in favourite list or not and reflect the same in UI
function checkIfResultsAreInFavList(searchResultsBox) {
    let movieListFromLocalStorage = JSON.parse(localStorage.getItem('movieList'));
    if(movieListFromLocalStorage) {
        for(let movieImdbID in movieListFromLocalStorage){
            for(let child of searchResultsBox.childNodes) {
                if(child.getAttribute('data-imdb-id') === movieImdbID) {
                    child.childNodes[1].checked = true;
                    break;
                }
            }
        }
    }
}

// Add or remove movie from favourite list basing on user UI response
function addRemoveMovieToFavList(e) {
    e.stopPropagation();
    let movieListFromLocalStorage = JSON.parse(localStorage.getItem('movieList'));
    if(e.target.checked) {
        if(movieListFromLocalStorage) {
            movieListFromLocalStorage[e.target.parentNode.getAttribute('data-imdb-id')] = e.target.previousSibling.textContent;
        } else {
            movieListFromLocalStorage = {};
            movieListFromLocalStorage[e.target.parentNode.getAttribute('data-imdb-id')] = e.target.previousSibling.textContent;
        }
    } else {
        if(movieListFromLocalStorage) {
            for(let movieImdbID in movieListFromLocalStorage) {
                if(movieImdbID === e.target.parentNode.getAttribute('data-imdb-id')) {
                    delete movieListFromLocalStorage[movieImdbID];
                    break;
                }
            }
        }
    }
    localStorage.setItem('movieList',JSON.stringify(movieListFromLocalStorage));
}

// Open movie information page
function openMoviePage(e) {
    fetch('https://www.omdbapi.com/?apikey=b523fdba&i='+e.currentTarget.getAttribute('data-imdb-id'))
    .then(res=>res.json())
    .then(data=>{
        window.location.href = `https://smrutisp.github.io/IMDb-Clone/moviePage/moviePage.html?Title=${data.Title}&Plot=${data.Plot}&Poster=${data.Poster}&Genre=${data.Genre}&Released=${data.Released}`;
    })
}
