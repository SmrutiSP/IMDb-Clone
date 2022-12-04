// fetch movie list from local storage
let movieList = JSON.parse(localStorage.getItem('movieList'));

// fetch favourite movies list container from UI
let favListContainer = document.querySelector('#main-container .favList');

// display the movie list from local storage in favourite movies list container in UI
for (let movieImdbID in movieList) {
    let favCheckbox = document.createElement('input');
    favCheckbox.type = 'checkbox';
    favCheckbox.checked = true;
    favCheckbox.addEventListener('click',removeMovieFromFavList);

    let textNode = document.createTextNode(movieList[movieImdbID]);

    let movie = document.createElement('div');
    movie.append(textNode,favCheckbox);
    movie.setAttribute('data-imdb-id', movieImdbID);
    movie.addEventListener('click', openMoviePage);
    favListContainer.append(movie);
}

// Remove movie from UI and from favourite list
function removeMovieFromFavList(e) {
    e.stopPropagation();
    if (movieList) {
        for (let movieImdbID in movieList) {
            if (movieImdbID === e.target.parentNode.getAttribute('data-imdb-id')) {
                delete movieList[movieImdbID];
                e.target.parentNode.remove();
                break;
            }
        }
    }
    localStorage.setItem('movieList', JSON.stringify(movieList));
}

// On click of movie name open the movie info page
function openMoviePage(e) {
    fetch('https://www.omdbapi.com/?apikey=b523fdba&i=' + e.currentTarget.getAttribute('data-imdb-id'))
        .then(res => res.json())
        .then(data => {
            window.location.href = `https://smrutisp.github.io/IMDb-Clone/moviePage/moviePage.html?Title=${data.Title}&Plot=${data.Plot}&Poster=${data.Poster}&Genre=${data.Genre}&Released=${data.Released}`;
        })
}
