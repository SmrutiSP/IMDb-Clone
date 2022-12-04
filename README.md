# IMDb-Clone

# Features:
There are 3 pages to this website:
- Home Page:- 
  Here there is a search-bar to search the name of a movie title and get the results and there is a link to go to favourite movies page.
  Each result will have two parts: one is the title of the movie and the other is a checkbox.
  Checking the checkbox will save that movie to favourite movie list which can be viewed in favourite movies page.
  Unchecking a previously checked checkbox will remove that movie from favourite movie list which means that movie wont be visible in favourite movies page.
  However clicking on the name of the movie will take you to the movie info page.
  
- Favourites Page:- 
  Here you can view the names of the movies which you saved to favourite movies list.
  Each name will have a checked checkbox on its right side. 
  Unchecking the checkbox will remove that movie from favourite movies list.
  However clicking on the name of the movie will take you to the movie info page.
  
- Movie Page:- 
  Here you can view more information about the movie on whose name you clicked.
 
# NOTE:
- When you save the movies as favourites then the information is stored in local storage of browser.
- Debouncing is used to limit API calls with each key stroke when inputting title of the movie in search bar on Home Page
