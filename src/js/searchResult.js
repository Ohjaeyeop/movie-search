export class SearchResult {
  constructor(target) {
    this.searchResult = document.createElement("div");
    this.searchResult.className = "searchResult";
    target.appendChild(this.searchResult);
  }
  render(movies) {
    this.searchResult.innerHTML = movies
      .map((movie) => {
        if (movie.posters.length > 0) {
          return `<div><img width=250px height=320px src=${this.getImageUrl(
            movie
          )} /></div>`;
        }
      })
      .join("");
  }
  getImageUrl(movie) {
    const imageUrl = movie.posters.split("|");
    const index = Math.floor(Math.random() * imageUrl.length);
    return imageUrl[index];
  }
}
