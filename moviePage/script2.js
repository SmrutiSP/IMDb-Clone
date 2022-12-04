// Fetch necessary UI elements
const moviePosterContainer = document.querySelector('#main-container .movie-poster');
const movieTitleContainer = document.querySelector('#main-container .movie-title');
const moviePlotContainer = document.querySelector('#main-container .movie-plot');
const movieGenreContainer = document.querySelector('#main-container .movie-genre');
const movieReleaseDateContainer = document.querySelector('#main-container .movie-release-date');

// Fetch the movie information from search parameters in URL
let searchParameters = new URLSearchParams(window.location.search);
let posterURL = searchParameters.get('Poster');
let title = searchParameters.get('Title');
let plot = searchParameters.get('Plot');
let genre = searchParameters.get('Genre');
let releaseDate = searchParameters.get('Released');

// Reflect the movie information in UI
let imgElement = document.createElement('img');
imgElement.src = `${posterURL}`;
moviePosterContainer.append(imgElement);
movieTitleContainer.textContent = title;
moviePlotContainer.textContent = plot;
movieGenreContainer.append(document.createTextNode(genre));
movieReleaseDateContainer.append(document.createTextNode(releaseDate));