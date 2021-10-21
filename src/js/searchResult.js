import { lazyLoad } from "./lazyLoad.js";

export class SearchResult {
  constructor(target) {
    this.searchResult = document.createElement("div");
    this.searchResult.className = "searchResult";
    target.appendChild(this.searchResult);
  }
  render(movies) {
    this.searchResult.innerHTML = movies
      .map((movie) => {
        return `<div><img class="lazy" width=240px height=320px alt="이미지 없음" data-src=${this.getImageUrl(
          movie
        )} /></div>`;
      })
      .join("");

    lazyLoad();
  }
  getImageUrl(movie) {
    const imageUrl = movie.posters.split("|");
    const index = Math.floor(Math.random() * imageUrl.length);
    return imageUrl[index];
  }
}
