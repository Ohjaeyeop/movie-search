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
          `<div><img src=${
            movie.posters.split("|")[0]
          } alt="이미지 없음"></div>`
      )
      .join("");
  }
}
