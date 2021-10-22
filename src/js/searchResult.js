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
        return `<div><img class="poster lazy" width=240px height=320px data-src="${this.getImageUrl(
          movie
        )}" data-stlls="${movie.stlls}" alt="${movie.title}" /></div>`;
      })
      .join("");

    this.createModal(movies);
    this.clickImage();
    lazyLoad();
  }

  getImageUrl(movie) {
    const imageUrl = movie.posters.split("|");
    const index = Math.floor(Math.random() * imageUrl.length);
    return imageUrl[index];
  }

  clickImage() {
    window.addEventListener("click", ({ target }) => {
      if (target.className === "poster") {
        this.showModal(target.alt, target.dataset.stlls);
      }
    });
  }

  createModal(movies) {
    this.searchResult.innerHTML += movies
      .map((movie) => {
        return `<div class="modal" id="${movie.title}"><h4>${movie.title}</h4><img class="stlls" alt="이미지 없음"/></div>`;
      })
      .join("");
  }

  showModal(title, stlls) {
    let modal = document.getElementById(title);
    let modalImage = modal.querySelector("img");
    modal.style.display = "block";

    const getStlls = stlls.split("|");
    modalImage.src = getStlls[0];
    const n = getStlls.length;

    const getRandomStll = () => {
      const index = Math.floor(Math.random() * n);
      modalImage.src = getStlls[index];
    };

    let timerId = setInterval(getRandomStll, 1000);
    document.addEventListener("click", (event) => {
      if (event.target !== modal) {
        modal.style.display = "none";
        clearInterval(timerId);
      }
    });
  }
}
