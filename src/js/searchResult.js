export class SearchResult {
  constructor(target) {
    this.searchResult = document.createElement("div");
    this.searchResult.className = "searchResult";
    target.appendChild(this.searchResult);
  }
  render(movies) {
    this.searchResult.innerHTML = movies
      .map(
        (movie) =>
          `<div><img width=213px height=305px src=${
            movie.posters.split("|")[0]
          }></div>`
      )
      .join("");
  }
}
